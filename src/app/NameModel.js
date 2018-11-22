import {PubSubService} from './PubSubService.js';

export class NameModel {
    constructor(data) {
        this.ajaxHandlerScript = "http://fe.it-academy.by/AjaxStringStorage2.php";
        this.stringName = 'CHANEL_STORAGE';
        this.user = data.user;
        this.chanel = data.channel;
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
            console.log(callresult.error);
        else {
            if (callresult.result !== "") { // либо строка пустая - сообщений нет
                // либо в строке - JSON-представление массива сообщений
                this.names = JSON.parse(callresult.result);
                view.siteBarNameList(this.names[this.chanel]);
                view.groupName(this.chanel);
                view.render(this.user);
            }
        }
    }

    errorHandler(jqXHR, statusStr, errorStr) {
        new PubSubService().pub('onError', 500);
    }
}
// ПОЛУЧЕНИЕ ДАННЫХ НА СЕРВЕРЕ----------------------------------------------------------------------
