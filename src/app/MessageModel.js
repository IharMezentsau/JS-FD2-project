export class MessageModel {
    constructor(user, chanel) {
        this.actionUrl = "http://fe.it-academy.by/AjaxStringStorage2.php";
        this.projectName = 'JS_FD2_project_';

        this.stringName = chanel ? chanel : 'MESENTSEV_CHAT_MESSAGES';

        this.user = user ? user : /*localStorage['user']*/ /*'test'*/localStorage['authName'];

        this.dialog = 'general';

        // модель предоставляет поле date для чтения извне
        this.date = new Date();
        // модель обновляет себя
        setInterval(() => {
            this.date = new Date();
            // нотифицирует слушателя путем вызова
            // его функции обратного вызова
            this.changeListenerCallback();

        }, 3000);
    }

    setChangeListener(changeListener) {
        this.changeListenerCallback = changeListener;
    }

    getMessages(readReady, view) {
        let messages;
        $.ajax( {
                url : this.actionUrl,
                type : 'POST',
                dataType: 'json',
                async: false,
                data : { f : 'READ', n : this.projectName + this.stringName },
                cache : false,
                success: (answer) => {
                    messages = readReady(answer);
                    if (!this.messages) {
                        this.messages = messages[this.dialog];
                        view.render(this, messages[this.dialog], this.user);
                    } else {
                        if (messages[this.dialog].length > this.messages.length) {
                            messages[this.dialog].splice(0, this.messages.length);
                            if (messages[this.dialog].length !== 0) {
                                this.messages.push(messages[this.dialog]);
                                view.render(this, messages[this.dialog], this.user);
                            }
                        }
                    }
                },

                //error : //errorHandler;
            }
        );
    }

    sendMessage(formMessage, readReady, handleModelChange) {
        this.updatePassword = Math.random();
        this.message = {name: this.user, mess: formMessage};
        $.ajax(
            {
                url : this.actionUrl,
                type : 'POST', dataType:'json',
                data : { f : 'LOCKGET', n : this.projectName + this.stringName,
                    p : this.updatePassword },
                cache : false,
                success : (a) => this.lockGetReady(a, readReady, handleModelChange),
                error : this.errorHandler,
            }
        );
    }

    lockGetReady(callresult, readReady, handleModelChange) {

        if (callresult.error != undefined)
            alert(callresult.error);
        else {
            let messages = {};
            if (typeof readReady === 'function') messages = readReady(callresult);
            if (messages[this.dialog] === undefined) messages[this.dialog] = [];

            messages[this.dialog].push(this.message);
            $.ajax({
                    url: this.actionUrl,
                    type: 'POST', dataType: 'json',
                    data: {
                        f: 'UPDATE', n: this.projectName + this.stringName,
                        v: JSON.stringify(messages), p: this.updatePassword
                    },
                    cache: false,
                    success: () => {
                        this.message = {};
                        handleModelChange();
                    },
                    error: this.errorHandler
                }
            );
        }
    }

    errorHandler(jqXHR,statusStr,errorStr) {
        alert(statusStr+' '+errorStr);
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