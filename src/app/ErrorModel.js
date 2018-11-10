export class ErrorModel {
    constructor(errorCode) {
        this.errorCode = errorCode;

        this.WIDTH = window.innerWidth;
        this.HEIGHT = window.innerHeight;
        this.MAX_PARTICLES = 150;
        this.DRAW_INTERVAL = 60;
        this.container = '';
        this.canvas = '';
        this.context = '';
        this.gradient = null;
        this.pixies = [];

        for (var i = 0; i < this.MAX_PARTICLES; i++) {
            console.log(this.pixies[i]);
            this.pixies.push(new Stars(this));
            this.pixies[i].reset();
        }
    }

    setCanvas() {
        document.getElementById('pageStatus').innerHTML = '<canvas id="star"> </canvas>'
    }

    getElementInView(view) {
        this.container = view.getContainer();
        this.canvas = view.getCanvas();
        this.context = view.getContext();
    }

    drawMain() {
        console.log('drawMain');
        this.context.clearRect(0, 0, this.WIDTH, this.HEIGHT);

        for (var i = 0; i < this.pixies.length; i++) {
            this.pixies[i].fade();
            this.pixies[i].move();
            this.pixies[i].draw();
        }
    }

    setDimensions() {
        this.WIDTH = window.innerWidth;
        this.HEIGHT = window.innerHeight;

        console.log("conteiner: " + this.container+ " canvas: " + this.canvas);

        this.container.style.width = this.WIDTH + 'px';
        this.container.style.height = this.HEIGHT + 'px';

        this.canvas.width = this.WIDTH;
        this.canvas.height = this.HEIGHT;
    }
}

class Stars {
    constructor(model) {
        this.model = model;
        this.settings = {
            ttl: 800,
            xmax: 5,
            ymax: 2,
            rmax: 10,
            rt: 1,
            xdef: 960,
            ydef: 540,
            xdrift: 4,
            ydrift: 4,
            random: true,
            blink: true
        };
    }

    reset() {
        this.x = (this.settings.random ? this.model.WIDTH * Math.random() : this.settings.xdef);
        this.y = (this.settings.random ? this.model.HEIGHT * Math.random() : this.settings.ydef);
        this.r = ((this.settings.rmax - 1) * Math.random()) + 1;
        this.dx = (Math.random() * this.settings.xmax) * (Math.random() < .5 ? -1 : 1);
        this.dy = (Math.random() * this.settings.ymax) * (Math.random() < .5 ? -1 : 1);
        this.hl = (this.settings.ttl / this.model.DRAW_INTERVAL) * (this.r / this.settings.rmax);
        this.rt = Math.random() * this.hl;
        this.settings.rt = Math.random() + 1;
        this.stop = Math.random() * .2 + .4;
        this.settings.xdrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
        this.settings.ydrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
    }

    fade() {
        this.rt += this.settings.rt;
    };

    draw() {

        if (this.settings.blink && (this.rt <= 0 || this.rt >= this.hl)) {
            this.settings.rt = this.settings.rt * -1;
        } else if (this.rt >= this.hl) {
            this.reset();
        }

        var newo = 1 - (this.rt / this.hl);
        this.model.context.beginPath();
        this.model.context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        this.model.context.closePath();

        //console.log("newo: " + newo + " r: " + this.r);

        var cr = this.r * newo;
        this.model.gradient = this.model.context.createRadialGradient(this.x, this.y, 0, this.x, this.y, (cr <= 0 ? 1 : cr));
        this.model.gradient.addColorStop(0.0, 'rgba(255,255,255,' + newo + ')');
        this.model.gradient.addColorStop(this.stop, 'rgba(77,101,181,' + (newo * .6) + ')');
        this.model.gradient.addColorStop(1.0, 'rgba(77,101,181,0)');
        this.model.context.fillStyle = this.model.gradient;
        this.model.context.fill();
    };

    move() {
        this.x += (this.rt / this.hl) * this.dx;
        this.y += (this.rt / this.hl) * this.dy;
        if (this.x > ErrorModel.WIDTH || this.x < 0) this.dx *= -1;
        if (this.y > ErrorModel.HEIGHT || this.y < 0) this.dy *= -1;
    };

    getX() {
        return this.x;
    };

    getY() {
        return this.y;
    };

}