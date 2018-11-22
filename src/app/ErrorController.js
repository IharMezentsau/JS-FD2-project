export class ErrorController {
    constructor(model, view) {
        this.view = view;
        this.model = model;

        //this.model.setCanvas();

        this.model.getElementInView(view);


        this.view.render();
        this.model.setDimensions();

        window.addEventListener('resize', this.view.setDimensions);
        window.addEventListener('hashchange', this.view.updatePage);

        setInterval(() => this.model.drawMain(), this.model.DRAW_INTERVAL);

    }
}