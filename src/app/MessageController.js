import {PubSubService} from "./PubSubService";

export class MessageController {
    constructor(model, view, service) {
        this.model = model;
        this.view = view;
        this.service = service;

        this.registerModelHandler();
    }

    registerModelHandler() {
        this.model.setChangeListener(
            () => this.handleModelChange());
        this.handleModelChange();
        this.model.getMessages(this.service.readReady, this.view);
        if (this.view.btnSendMessage !== undefined) {
            this.view.btnSendMessage.addEventListener('click',
                this.sendMessage.bind(this), false);
        }
        if (this.view.nameList !== undefined) {
            $(this.view.nameList).click(this.changeChannel.bind(this));
        }
        if (this.view.nameChannel !== undefined) {
            $(this.view.nameChannel).click(this.changeChannel);
        }
    }

    handleModelChange() {
        // при вызове функции обратного вызова
        // контроллер перерисовывает представление
        this.model.getMessages(this.service.readReady, this.view);
    }

    sendMessage() {
        let message = this.service.escapeHTML(this.view.formSendMessage.value);
        this.model.sendMessage(message, this.service.readReady, this.handleModelChange.bind(this), this.view);
    }

    changeChannel(e) {
        let stringArray = [$(e.target).text().replace(/^person/, ''), this.model.user];
        this.model.dialog = stringArray.sort().join('');
        this.model.messages = [];
        this.view.listMessages.innerHTML = '';
    }

}