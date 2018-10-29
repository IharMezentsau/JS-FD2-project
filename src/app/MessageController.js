export class MessageController {
    constructor(model, view, service) {
        this.model = model;
        this.view = view;
        this.service = service;

        this.view.setChangeHandler(
            checked => {
                if (checked) {
                    this.registerModelHandler();
                } else {
                    this.model.setChangeListener(null);
                }
            }
        );

        this.registerModelHandler();
    }

    registerModelHandler() {
        this.model.setChangeListener(
            () => this.handleModelChange());
        this.handleModelChange();

        if (this.view.btnSendMessage !== undefined) {
            this.view.btnSendMessage.addEventListener('click',
                this.sendMessage.bind(this), false);
        }
    }

    handleModelChange() {
        // при вызове функции обратного вызова
        // контроллер перерисовывает представление
        this.model.getMessages(this.service.readReady, this.view);
    }

    sendMessage() {
        let message = this.service.escapeHTML(this.view.formSendMessage.value);
        this.model.sendMessage(message, this.service.readReady, this.handleModelChange.bind(this));
    }

    /*constructor(model, view, service, chanelName) {
        this.model = model;
        this.view = view;
        this.service = service;
        this.chanelName = chanelName;
        // контроллер при снятии флажка в представлении
        // перестает слушать изменения модели,
        // а при установке - продолжает
        this.view.setChangeHandler(
            checked => {
                if (checked) {
                    this.registerModelHandler();
                } else {
                    this.model.setChangeListener(null);
                }
            }
        );

        this.registerModelHandler();

    }

    registerModelHandler() {
        this.model.setChangeListener(
            () => this.handleModelChange());
        this.handleModelChange();
    }

    sendMessage() {
        let newMessage = this.service.escapeHTML(this.view.inputField);
        this.model.sendMessage(this.chanelName, newMessage, errorHandler);
    }

    handleModelChange() {
        // при вызове функции обратного вызова
        // контроллер перерисовывает представление
        this.view.render(this.model);
    }*/
}





