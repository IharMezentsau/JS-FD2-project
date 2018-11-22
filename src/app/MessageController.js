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
            this.view.formSendMessage.addEventListener('keypress', this.sendMessageKeyPress.bind(this), false);
        }
        if (this.view.nameList !== undefined) $(this.view.nameList).click(this.changeChannel.bind(this));
        if (this.view.nameChannel !== undefined) $(this.view.nameChannel).click(this.changeChannel);
        if (this.view.smileDiv !== undefined) $(this.view.smileDiv).click(this.sendSmile.bind(this));
        if (this.view.btnGeneralChannel !== undefined) $(this.view.btnGeneralChannel)
            .click(() => this.changeNameChannel('general'));
        if (this.view.listMessages) {
            this.view.listMessages.parentNode
                .addEventListener('scroll', this.loadOldMessages.bind(this));
        }

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
        let EO = $(e.target),
            channelName = EO.text().replace(/^person/, '');
        this.changeNameChannel(channelName);
        EO.addClass('active');
    }

    changeNameChannel(nameChannel) {
        let stringArray = [nameChannel, this.model.user],
            channelName = '';
        if (nameChannel !== 'general') {
            channelName = stringArray.sort().join('');
            new PubSubService().pub('changeChannelOnClick', nameChannel);
        } else {
            channelName = 'general';
            new PubSubService().pub('changeChannelOnClick', channelName);
        }
        $('.active').removeClass('active');
        this.model.dialog = channelName;
        delete this.model.messages;
        this.view.listMessages.innerHTML = '';
        this.handleModelChange();
    }

    loadOldMessages(e) {
        if ($(e.target).children('ul').children('li').length < 5) return;
        if ($(e.target).children('ul').offset().top >= $(this.view.listMessages).parent().offset().top) {
          this.model.loadOldMessage($(this.view.listMessages).children('li').length,
                this.view.renderOldMessages.bind(this.view));
        }
    }
}