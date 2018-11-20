class ErrorController {
    constructor(model, view) {
        this.view = view;
        this.model = model;

        this.view.initStars();
        this.view.initCanvas();
        this.view.add_HTML_Data();
        this.view.setDimensions();

        window.addEventListener('resize', this.view.setDimensions);
        //window.addEventListener('hashchange', this.view.updatePage);

        setInterval(() => this.view.renderStars(), this.view.DRAW_INTERVAL);

        this.view.setErrorPage(this.model.getErrorCode());
    }
}