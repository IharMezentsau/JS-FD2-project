export class NameController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.model.getAuthorizationStorage(view);
        // this.view.siteBarChannel();
    }
}
