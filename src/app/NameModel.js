export class NameModel {
    constructor() {
        this.ajaxHandlerScript = "http://fe.it-academy.by/AjaxStringStorage2.php";
        this.stringName = 'CHUPILIN_SITE_STORAGE';
    }


    // ПОЛУЧЕНИЕ ДАННЫХ НА СЕРВЕРЕ----------------------------------------------------------------------
    getAuthorizationStorage(view) {
        $.ajax({
                url: this.ajaxHandlerScript,
                type: 'POST', dataType: 'json',
                data: {f: 'READ', n: this.stringName},
                cache: false,
                success: callresult => this.readReady(callresult, view),
                error: this.errorHandler
            }
        );
    }

    readReady(callresult, view) { // сообщения получены - показывает
        if (callresult.error !== undefined)
            alert(callresult.error);
        else {
            if (callresult.result !== "") { // либо строка пустая - сообщений нет
                // либо в строке - JSON-представление массива сообщений
                this.names = JSON.parse(callresult.result);
                console.log(this.names);
                view.siteBarNameList(this.names);
            }
        }
    }
}
// ПОЛУЧЕНИЕ ДАННЫХ НА СЕРВЕРЕ----------------------------------------------------------------------