import {PubSubService} from "./PubSubService";

export class MessageController {
    constructor(model, view, service) {
        this.model = model;
        this.view = view;
        this.service = service;

        this.registerModelHandler();
        this.view.getSmile();
    }

    registerModelHandler() {
        this.model.setChangeListener(
            () => this.handleModelChange());
        this.handleModelChange();
        this.model.getMessages(this.service.readReady, this.view);
        if (this.view.btnSendMessage !== undefined) {
            this.view.btnSendMessage.addEventListener('click',
                this.sendMessage.bind(this), false);
            this.view.formSendMessage.addEventListener('keypress', this.sendMessageKeyPress.bind(this), false);
        }
        if (this.view.nameList !== undefined) $(this.view.nameList).click(this.changeChannel.bind(this));
        if (this.view.nameChannel !== undefined) $(this.view.nameChannel).click(this.changeChannel);
        if (this.view.smileDiv !== undefined) $(this.view.smileDiv).click(this.sendSmile.bind(this));
    }

    handleModelChange() {
        // при вызове функции обратного вызова
        // контроллер перерисовывает представление
        this.model.getMessages(this.service.readReady, this.view);
    }

    sendMessageKeyPress(e) {
        if (e.keyCode === 13) this.sendMessage();
    }

    sendMessage() {
        let message = this.service.escapeHTML(this.view.formSendMessage.value);
        this.model.sendMessage(message, this.service.readReady, this.handleModelChange.bind(this), this.view);
    }

    sendSmile(e) {
        let EO = $(e.target).parents('svg')[0];
        let message = this.service.escapeHTML($(EO).data('smileid'));
        this.model.sendMessage(message, this.service.readReady, this.handleModelChange.bind(this), this.view);
    }

    changeChannel(e) {
        $('.active').removeClass('active');
        let chanelName = $(e.target).text().replace(/^person/, ''),
            stringArray = [chanelName, this.model.user];
        new PubSubService().pub('changeNameChannel', chanelName);
        $(e.target).addClass('active');
        this.model.dialog = stringArray.sort().join('');
        delete this.model.messages;
        this.view.listMessages.innerHTML = '';
        this.handleModelChange();
    }

}