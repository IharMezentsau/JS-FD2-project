export class Model {
    constructor(window, document, canvas) {
        this.WIDTH = window.innerWidth;
        this.HEIGHT = window.innerHeight;
        this.MAX_PARTICLES = 100;
        this.DRAW_INTERVAL = 60;
        this.container = document.querySelector('header');
        this.canvas = document.querySelector('#universe');
        this.context = canvas.getContext('2d');
        this.gradient = null;
        this.pixies = new Array();
    }


}