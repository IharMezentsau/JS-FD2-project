export class ErrorView {
    constructor(root) {
        console.log('View constructor');
        this.root = root;

        this.WIDTH = window.innerWidth;
        this.HEIGHT = window.innerHeight;
        this.MAX_PARTICLES = 60;
        this.DRAW_INTERVAL = 60;
        this.gradient = null;
        this.pixies = [];
        this.container = '';
        this.canvas = '';
        this.context = '';
    }

    addAudioStream() {
        var audio = new Audio('http://stream.hoster.by:8081/pilotfm/pilot/icecast.audio');
        audio.play();
    }

    add_HTML_Data() {

        this.addAudioStream();

        this.root.innerHTML = `<header class="headerStas"><canvas id='star'> </canvas>
        <div id="hero" class="hero">
        <div class="container">
            <div class="row">
                <div>
                    <h1 id="nameError"> </h1>
                    <h2 id="errorText"> </h2>
                    <a href="#auth" onclick="hrefAction()" class="btn-back">Вернутся на землю</a>
                </div>
                <div>
                    <div class="image">
                        <img id="imageError" src="#" alt="ImageError">
                    </div>
                </div>
            </div>
        </div>
        </div>
        </header>`;

        this.container = document.querySelector('header');
        this.canvas = document.querySelector('#star');
        this.context = this.canvas.getContext('2d');
    }

    hrefAction(){
        console.log('location change');
        window.location='#auth';
    }

    initStars() {
        for (var i = 0; i < this.MAX_PARTICLES; i++) {
            this.pixies.push(new Stars(this));
            this.pixies[i].reset();
        }
    }

    initCanvas() {
        console.log('add canvas');
        document.getElementById('divMain').innerHTML = '<canvas id="star"> </canvas>';
    }

    renderStars() {
        console.log('draw stars!');
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

        document.querySelector('header').style.width = this.WIDTH + 'px';
        document.querySelector('header').style.height = this.HEIGHT + 'px';

        document.querySelector('#star').width = this.WIDTH;
        document.querySelector('#star').height = this.HEIGHT;
    }

    setErrorPage(errorCode) {
        let code = "#" + errorCode;
        let nameError = document.getElementById('nameError');
        let errorText = document.getElementById('errorText');
        let imageError = document.getElementById('imageError');

        switch (code) {
            case "#400": {
                console.log("400");
                nameError.innerText = "400";
                errorText.innerText = "Похоже, что то не так(";
                imageError.src = "./img/404.png";
                break;
            }
            case "#401": {
                console.log("401");
                nameError.innerText = "401";
                errorText.innerText = "Похоже, вы не авторизованы!";
                imageError.src = "./img/401.png";
                break;
            }
            case "#403": {
                console.log("403");
                nameError.innerText = "403";
                errorText.innerText = "Похоже, вы не туда летите!";
                imageError.src = "./img/403.png";
                break;
            }
            case "#404": {
                console.log("404");
                nameError.innerText = "404";
                errorText.innerText = "Похоже, вы вышли в открытый космос...";
                imageError.src = "./img/404.png";
                break;
            }
            case "#500": {
                console.log("500");
                nameError.innerText = "500";
                errorText.innerText = "Боже мой, у вас внутренняя ошибка сервера =(";

                imageError.src = "./img/500.png";

                break;
            }
            case "#error": {
                console.log("error");
                nameError.innerText = "???";
                errorText.innerText = "Спросить у сына маминой подруги что не так, он разбирается!";

                imageError.src = "./img/errorUn.png";

                break;
            }
            case "#ieError": {
                console.log("browser = ie");
                nameError.innerText = "IE(";
                errorText.innerText = "Боже мой, у вас IE! Выкиньте свое устройство или используйте нормальный браузер! Приложение работает в IE))";
                imageError.src = "./img/500ei.png";
                break;
            }
            default : {
                console.log("200");
                nameError.innerText = "200";
                errorText.innerText = "Похоже, у вас все хорошо! Желаем получить сертификаты ;)";
                imageError.src = "./img/200.png";
                break;
            }
        }
    }
}

class Stars {
    constructor(view) {
        this.view = view;
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
        this.x = (this.settings.random ? this.view.WIDTH * Math.random() : this.settings.xdef);
        this.y = (this.settings.random ? this.view.HEIGHT * Math.random() : this.settings.ydef);
        this.r = ((this.settings.rmax - 1) * Math.random()) + 1;
        this.dx = (Math.random() * this.settings.xmax) * (Math.random() < .5 ? -1 : 1);
        this.dy = (Math.random() * this.settings.ymax) * (Math.random() < .5 ? -1 : 1);
        this.hl = (this.settings.ttl / this.view.DRAW_INTERVAL) * (this.r / this.settings.rmax);
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
        this.view.context.beginPath();
        this.view.context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        this.view.context.closePath();

        //console.log("newo: " + newo + " r: " + this.r);

        var cr = this.r * newo;
        this.view.gradient = this.view.context.createRadialGradient(this.x, this.y, 0, this.x, this.y, (cr <= 0 ? 1 : cr));
        this.view.gradient.addColorStop(0.0, 'rgba(255,255,255,' + newo + ')');
        this.view.gradient.addColorStop(this.stop, 'rgba(77,101,181,' + (newo * .6) + ')');
        this.view.gradient.addColorStop(1.0, 'rgba(77,101,181,0)');
        this.view.context.fillStyle = this.view.gradient;
        this.view.context.fill();
    };

    move() {
        this.x += (this.rt / this.hl) * this.dx;
        this.y += (this.rt / this.hl) * this.dy;
        if (this.x > this.view.WIDTH || this.x < 0) this.dx *= -1;
        if (this.y > this.view.HEIGHT || this.y < 0) this.dy *= -1;
    };

    getX() {
        return this.x;
    };

    getY() {
        return this.y;
    };

}