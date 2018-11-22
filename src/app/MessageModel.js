import {PubSubService} from './PubSubService.js';

export class MessageModel {
    constructor(data) {
        this.actionUrl = "http://fe.it-academy.by/AjaxStringStorage2.php";
        this.projectName = 'JS_FD2_project_';

        this.stringName = data.channel;

        this.user = data.user;

        this.dialog = 'general';

        // модель предоставляет поле date для чтения извне
        this.intervalMessages = setInterval(() => {
            // нотифицирует слушателя путем вызова
            // его функции обратного вызова
            this.changeListenerCallback();

        }, 3000);
        new PubSubService().sub('clearIntervalMessages', () => {
            clearInterval(this.intervalMessages);
        });
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
                    if (!(this.dialog in messages)) messages[this.dialog] = []; // если канал активирован впервые
                    if (!this.messages) { // Проверка на отрисовку первых сообщений
                        this.messages = messages[this.dialog];
                        let sizeMessages = 4;
                        if (messages[this.dialog].length > sizeMessages) { // вызов последних 4 элементов
                            view.render(messages[this.dialog].slice(-sizeMessages), this.user);
                        } else {
                            view.render(messages[this.dialog], this.user);
                        }
                    } else {
                        if (messages[this.dialog].length > this.messages.length) {
                            messages[this.dialog].splice(0, this.messages.length);
                            if (messages[this.dialog].length !== 0) {
                                this.messages.push(messages[this.dialog]);
                                view.renderMessages(messages[this.dialog], this.user);
                            }
                        }
                    }
                },
                error : () => view.render([{name: 'system', mess: 'Проблемма с получением сообщения'}]),
            }
        );
    }

    sendMessage(formMessage, readReady, handleModelChange, view) {
        if (formMessage !== '') {
            this.updatePassword = Math.random();
            this.message = {name: this.user, mess: formMessage};
            setTimeout(new PubSubService().pub('clickSendMessage'), 500);
            $.ajax(
                {
                    url: this.actionUrl,
                    type: 'POST', dataType: 'json',
                    data: {
                        f: 'LOCKGET', n: this.projectName + this.stringName,
                        p: this.updatePassword
                    },
                    cache: false,
                    success: (a) => this.lockGetReady(a, readReady, handleModelChange, view),
                    error: () => {
                        new PubSubService().pub('endSendMessage');
                        view.render([{name: 'system', mess: 'Проблемма с отправкой сообщения'}])
                    },
                }
            )
        }
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
                    success: (a) => {
                        new PubSubService().pub('endSendMessage', a.result);
                        this.message = {};
                        handleModelChange();
                    },
                    error: () => {
                        new PubSubService().pub('endSendMessage');
                        view.render([{name: 'system', mess: 'Проблемма с отправкой сообщения'}])
                    },
                }
            );
        }
    }

    loadOldMessage(length, renderOldMessages) {
        let endOldMessages = this.messages.length - length,
            startOldMessages = endOldMessages >= 4 ? endOldMessages - 4: endOldMessages,
            oldMessages = this.messages.slice(startOldMessages, endOldMessages);
        if (oldMessages.length !== 0) renderOldMessages(oldMessages, this.user);
    }

}