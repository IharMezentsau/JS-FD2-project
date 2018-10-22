export class MessageController {
    constructor(model, view, service, locale) {
        this.model = model;
        this.view = view;
        this.service = service;
        this.locale = locale;
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

    handleModelChange() {
        // при вызове функции обратного вызова
        // контроллер перерисовывает представление

        this.model.getMessages(this.model.stringName, this.service.readReady, this.view);
        //alert(messages);
        //return(a);
        //this.view.render(this.model, messages, this.locale);
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





