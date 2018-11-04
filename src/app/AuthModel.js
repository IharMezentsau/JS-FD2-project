import {PubSubService} from './PubSubService.js';

export class AuthModel {
    constructor() {
        this.ajaxHandlerScript = "http://fe.it-academy.by/AjaxStringStorage2.php";
        this.stringName = 'CHUPILIN_SITE_STORAGE';
        this.messages = {};
        this.changes = new PubSubService();
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
            alert(callresult.error);
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

    // ПОЛУЧЕНИЕ ДАННЫХ НА СЕРВЕР----------------------------------------------------------------------
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
            alert(callresult.error);
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
            alert(callresult.error);
    }

    // ЗАПИСЬ ДАННЫХ НА СЕРВЕР----------------------------------------------------------------------------

    errorHandler(jqXHR, statusStr, errorStr) {
        console.log(statusStr + ' ' + errorStr);
    }
}