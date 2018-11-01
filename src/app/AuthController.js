export class AuthController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.render();
        this.view.events(model);
    }
}
