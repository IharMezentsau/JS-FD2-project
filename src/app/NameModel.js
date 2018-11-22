import {PubSubService} from './PubSubService.js';

export class NameModel {
    constructor(data) {
        this.ajaxHandlerScript = "http://fe.it-academy.by/AjaxStringStorage2.php";
        this.stringName = 'CHUPILIN_CHAT';
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
                console.log(this.names);
                view.siteBarNameList(this.names);
                view.render(this.user);
            }
        }
    }
}
// ПОЛУЧЕНИЕ ДАННЫХ НА СЕРВЕРЕ----------------------------------------------------------------------
