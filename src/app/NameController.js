export class NameController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.model.getAuthorizationStorage(view);
        view.channelName();
    }
}
