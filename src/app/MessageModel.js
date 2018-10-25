export class MessageModel {
    constructor(timezone) {
        this.actionUrl = "http://fe.it-academy.by/AjaxStringStorage2.php";
        this.projectName = 'JS_FD2_project_';

        this.stringName='LOKTEV_CHAT_MESSAGES';

        this.timezone = timezone; // TODO: добавить зоны
        this.changeListener = null;
        // модель предоставляет поле date для чтения извне
        this.date = new Date();
        // модель обновляет себя
        setInterval(() => {
            this.date = new Date();
            if (typeof (this.changeListenerCallback) === 'function') {
                // и нотифицирует слушателя путем вызова
                // его функции обратного вызова
                this.changeListenerCallback();
            }
        }, 3000);
    }

    setChangeListener(changeListener) {
        this.changeListenerCallback = changeListener;
    }

    getMessages(chanelName, readReady, view) {
        let messages;
        $.ajax( {
                url : this.actionUrl,
                type : 'POST',
                dataType: 'json',
                async: false,
                data : { f : 'READ', n : /*this.projectName +*/ chanelName },
                cache : false,
                success: (answer) => {
                    messages = readReady(answer);
                    /*if (!this.messages) {
                        this.messages = messages;
                    } else {
                        messages.splice(0, this.messages.length);
                        if (messages.length !== 0) this.messages.push(messages);
                        alert(this.messages + 'length this' + this.messages.length + ' length mess' + messages.length + '    ' + messages);
                    }*/
                    view.render(this, messages);
                },

                //error : //errorHandler;
            }
        );
        //return messages;
    }

}
    /*constructor(timezone) {
        this.actionUrl = "http://fe.it-academy.by/AjaxStringStorage2.php";
        this.projectName = 'JS_FD2_project_';
        this.timezone = timezone; // TODO: добавить зоны
        this.changeListener = null;
        // модель предоставляет поле date для чтения извне
        //this.date = new Date();
        // модель обновляет себя
        setInterval(() => {
            //this.date = new Date();
            if (typeof (this.changeListenerCallback) === 'function') {
                // и нотифицирует слушателя путем вызова
                // его функции обратного вызова
                this.changeListenerCallback();
            }
        }, 1000);
    }

    setChangeListener(changeListener) {
        this.changeListenerCallback = changeListener;
    }

    getMessage(chanelName, readReady, errorHandler) {

        $.ajax( {
                url : this.actionUrl,
                type : 'POST',
                dataType: 'json',
                data : { f : 'READ', n : this.projectName + chanelName },
                cache : false,
                success : (messages) => {
                    this.messages = messages;
                },
                error : errorHandler
            }
        );
    }


    sendMessage(chanelName, newMessage, errorHandler) {
        // получает сообщения с сервера, добавляет новое,
        // показывает и сохраняет на сервере
        let updatePassword,

            lockGetReady = (callresult) => {// сообщения получены, добавляет, показывает, сохраняет
                if ( callresult.error != undefined )
                    alert(callresult.error); //TODO добавить обработку
                else {
                    let messages=[],
                        senderName = document.getElementById('login').value,
                        message = newMessage,
                        updateReady = (callresult) => {// сообщения вместе с новым сохранены на сервере
                            if ( callresult.error != undefined )
                                alert(callresult.error);
                        };

                    if ( callresult.result != "" ) // либо строка пустая - сообщений нет
                    {
                        // либо в строке - JSON-представление массива сообщений
                        messages = JSON.parse(callresult.result);
                        // вдруг кто-то сохранил мусор
                        if ( !Array.isArray(messages) )
                            messages = [];
                    }

                    messages.push( { name: senderName, mess: message } );
                    if ( messages.length > 10 )
                        messages = messages.slice(messages.length - 10);

                    $.ajax( {
                            url : this.actionUrl,
                            type : 'POST', dataType:'json',
                            data : { f : 'UPDATE', n : this.projectName + chanelName,
                                v : JSON.stringify(messages), p : updatePassword },
                            cache : false,
                            success : updateReady,
                            error : errorHandler
                        }
                    );
                }
            };


        (function sendMessage(ajaxHandlerScript, stringName) {
            updatePassword = Math.random();
            $.ajax(
                {
                    url : ajaxHandlerScript,
                    type : 'POST', dataType:'json',
                    data : { f : 'LOCKGET', n : stringName,
                        p : updatePassword },
                    cache : false,
                    success : lockGetReady,
                    error : errorHandler
                }
            );
        }) (this.actionUrl, this.projectName + chanelName);

    }

}*/
