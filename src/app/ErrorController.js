import {PubSubService} from "./PubSubService";

export class ErrorController {
    constructor(model, view) {
        this.view = view;
        this.model = model;

        this.view.initStars();
        //this.view.initCanvas();
        this.view.add_HTML_Data();
        this.view.setDimensions();
        this.view.setErrorPage(this.model.getErrorCode());

        window.addEventListener('resize', this.view.setDimensions);
        //window.addEventListener('hashchange', this.view.updatePage);

        this.errorInterval = setInterval(() => this.view.renderStars(), this.view.DRAW_INTERVAL);

        new PubSubService().sub('clearIntervalError', () => {
            clearInterval(this.errorInterval);
        });
    }
}