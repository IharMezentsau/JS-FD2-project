export class MessageModel {
    constructor(user, chanel) {
        this.actionUrl = "http://fe.it-academy.by/AjaxStringStorage2.php";
        this.projectName = 'JS_FD2_project_';

        this.stringName = chanel ? chanel : 'MESENTSEV_CHAT_MESSAGES';

        this.user = user ? user : /*localStorage['user']*/ 'test';

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
                    messages = readReady(answer, view);
                    if (!this.messages) {
                        this.messages = messages[this.dialog];
                        view.render(messages[this.dialog], this.user);
                    } else {
                        if (messages[this.dialog].length > this.messages.length) {
                            messages[this.dialog].splice(0, this.messages.length);
                            if (messages[this.dialog].length !== 0) {
                                this.messages.push(messages[this.dialog]);
                                view.render(messages[this.dialog], this.user);
                            }
                        }
                    }
                },
                error : () => view.render([{name: 'system', mess: 'Проблемма с получением сообщения'}]),
            }
        );
    }

    sendMessage(formMessage, readReady, handleModelChange, view) {
        this.updatePassword = Math.random();
        this.message = {name: this.user, mess: formMessage};
        $.ajax(
            {
                url : this.actionUrl,
                type : 'POST', dataType:'json',
                data : { f : 'LOCKGET', n : this.projectName + this.stringName,
                    p : this.updatePassword },
                cache : false,
                success : (a) => this.lockGetReady(a, readReady, handleModelChange, view),
                error : () => view.render([{name: 'system', mess: 'Проблемма с отправкой сообщения'}]),
            }
        );
    }

    lockGetReady(callresult, readReady, handleModelChange, view) {

        if (callresult.error != undefined)
            view.render([{name: 'system', mess: callresult.error}]);
        else {
            let messages = {};
            if (typeof readReady === 'function') messages = readReady(callresult, view);
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
                    error: () => view.render([{name: 'system', mess: 'Проблемма с отправкой сообщения'}]),
                }
            );
        }
    }

}