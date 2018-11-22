export class AuthModel {
    constructor() {
        this.ajaxHandlerScript = "http://fe.it-academy.by/AjaxStringStorage2.php";
        this.stringName = 'CHUPILIN_CHAT';
        /*CHUPILIN_SITE_STORAGE*/
        this.messages = {};

        this.getNameAuth();

        this.userName = undefined; //-- при клике на вход сюда передастся имя юзера
        this.channel = undefined; //-- после того как андрей сделает пока undefined

        // setInterval(()=>{console.log(this.userName)}, 2000);
    }


    // ПОЛУЧЕНИЕ ДАННЫХ НА СЕРВЕР----------------------------------------------------------------------
    getAuthorizationStorage(name, pass, popupLogin, view) {
        $.ajax({
                url: this.ajaxHandlerScript,
                type: 'POST', dataType: 'json',
                data: {f: 'READ', n: this.stringName},
                cache: false,
                success: callresult => this.readReady(callresult, name, pass, popupLogin, view),
                error: this.errorHandler
            }
        );
    }

    readReady(callresult, name, pass, popupLogin, view) { // сообщения получены - показывает
        if (callresult.error !== undefined)
            console.log(callresult.error);
        else {
            if (callresult.result !== "") { // либо строка пустая - сообщений нет
                // либо в строке - JSON-представление массива сообщений
                this.messages = JSON.parse(callresult.result);
            }
            try {
                if (this.messages[name].pass !== pass) {
                    view.authError(popupLogin);
                } else {
                    view.authSuccess(name, popupLogin);
                }
            }
            catch {
                if (this.messages[name] === undefined || !name || !pass) {
                    view.authError(popupLogin);
                }
            }
        }
    }

    getNameAuth(name) {
        this.userName = name;
    }

    // ПОЛУЧЕНИЕ ДАННЫХ НА СЕРВЕР----------------------------------------------------------------------
    // ПРОВЕРКА ЗАНЯТО ЛИ ТАКОЕ ИМЯ НА СЕРВЕРЕ----------------------------------------------------------

    checkAuthorizationStorage(name, pass, passCheck, popupCheckin, view) {
        $.ajax({
                url: this.ajaxHandlerScript,
                type: 'POST', dataType: 'json',
                data: {f: 'READ', n: this.stringName},
                cache: false,
                success: callresult => this.checkReadReady(callresult, name, pass, passCheck, popupCheckin, view),
                error: this.errorHandler
            }
        );
    }

    checkReadReady(callresult, name, pass, passCheck, popupCheckin, view) { // сообщения получены - показывает
        if (callresult.error !== undefined)
            console.log(callresult.error);
        else {
            if (callresult.result !== "") { // либо строка пустая - сообщений нет
                // либо в строке - JSON-представление массива сообщений
                this.messages = JSON.parse(callresult.result);
            }
            if (this.messages[name] !== undefined) {
                view.checkinNameError(popupCheckin);
            }
            else if (!name || !pass || pass !== passCheck) {
                view.checkinError(popupCheckin);
            }
            else {
                this.sendAuthorization(name, pass);
                view.checkinSuccess(name, popupCheckin);
            }
        }
    }

    // ПРОВЕРКА ЗАНЯТО ЛИ ТАКОЕ ИМЯ НА СЕРВЕРЕ----------------------------------------------------------
    // ЗАПИСЬ ДАННЫХ НА СЕРВЕР-----------------------------------------------------

    sendAuthorization(name, pass) {
        this.updatePassword = Math.random();
        $.ajax(
            {
                url: this.ajaxHandlerScript,
                type: 'POST', dataType: 'json',
                data: {
                    f: 'LOCKGET', n: this.stringName,
                    p: this.updatePassword
                },
                cache: false,
                success: (a) => this.lockGetReady(a, (name, pass) => {
                    this.messages[name] = {pass};
                }, name, pass),
                error: this.errorHandler
            }
        );
    }

    lockGetReady(callresult, func, name, pass) {
        if (callresult.error !== undefined)
            console.log(callresult.error);
        else {
            if (callresult.result !== "") {
                this.messages = JSON.parse(callresult.result);
            }
            func(name, pass);
            $.ajax({
                    url: this.ajaxHandlerScript,
                    type: 'POST', dataType: 'json',
                    data: {
                        f: 'UPDATE', n: this.stringName,
                        v: JSON.stringify(this.messages), p: this.updatePassword
                    },
                    cache: false,
                    success: this.updateReady,
                    error: this.errorHandler
                }
            );
        }
    }

    updateReady(callresult) {
        if (callresult.error !== undefined)
            console.log(callresult.error);
    }

    // ЗАПИСЬ ДАННЫХ НА СЕРВЕР----------------------------------------------------------------------------

    errorHandler(jqXHR, statusStr, errorStr) {
        new PubSubService().pub('onError', 404);
    }
}
