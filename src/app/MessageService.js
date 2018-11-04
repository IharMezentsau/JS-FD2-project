export class MessageService {
    constructor() {

    }

    escapeHTML(text) {
            if ( !text )
                return text;
            text = text.toString()
                .split("&").join("&amp;")
                .split("<").join("&lt;")
                .split(">").join("&gt;")
                .split('"').join("&quot;")
                .split("'").join("&#039;");
            return text;
    }

    readReady(callresult, view) { // сообщения получены - показывает
        if ( callresult.error != undefined )
            view.render([{name: 'system', mess: callresult.error}]);
        else {
            let messages = {};
            if ( callresult.result != "" ) { // либо строка пустая - сообщений нет
                // либо в строке - JSON-представление массива сообщений
                messages = JSON.parse(callresult.result);
                // вдруг кто-то сохранил мусор вместо CHAT_MESSAGES?
                if (typeof messages !== 'object') messages = {};
            }
            return messages;
        }
    }


}