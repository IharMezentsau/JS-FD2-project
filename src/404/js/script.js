document.getElementById('pageStatus').innerHTML = `<canvas id="star">

    </canvas>
   
    <div class="hero">
        <div class="container">
            <div class="row">
                <div class="col-sm-8">
                    <h1 id="nameError"></h1>
                    <h2 id="errorText"></h2>
                    <a href="#" class="btn-back">Вернутся на землю</a>
                </div>
                <div class="col-sm-4">
                    <div class="roket">
                        <img src="./img/rocket.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>`;


function updatePage() {
    let nameError = document.getElementById('nameError');
    let errorText = document.getElementById('errorText');

    switch (window.location.hash) {
        case "#404": {
            console.log("404");
            nameError.innerText = "404";
            errorText.innerText = "Похоже, вы вышли в открытый космос...";
            break;
        }
        case "#401": {
            console.log("401");
            nameError.innerText = "401";
            errorText.innerText = "Похоже, вы не авторизованы!";
            break;
        }
        case "#500": {
            console.log("500");
            nameError.innerText = "500";
            errorText.innerText = "Боже мой, у вас внутренняя ошибка сервера =(";
            break;
        }
        default : {
            console.log("400");
            nameError.innerText = "400";
            errorText.innerText = "Похоже, вам необходимо выкинуть комп...";
            break;
        }
    }
}


var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight,
    MAX_PARTICLES = 100,
    DRAW_INTERVAL = 1,
    container = document.querySelector('header'),
    canvas = document.querySelector('#star'),
    context = canvas.getContext('2d'),
    gradient = null,
    pixies = new Array();

function setDimensions(e) {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    container.style.width = WIDTH + 'px';
    container.style.height = HEIGHT + 'px';
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
}

setDimensions();
window.addEventListener('resize', setDimensions);
window.addEventListener("hashchange", updatePage);

function Stars() {
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
    this.reset = function () {
        this.x = (this.settings.random ? WIDTH * Math.random() : this.settings.xdef);
        this.y = (this.settings.random ? HEIGHT * Math.random() : this.settings.ydef);
        this.r = ((this.settings.rmax - 1) * Math.random()) + 1;
        this.dx = (Math.random() * this.settings.xmax) * (Math.random() < .5 ? -1 : 1);
        this.dy = (Math.random() * this.settings.ymax) * (Math.random() < .5 ? -1 : 1);
        this.hl = (this.settings.ttl / DRAW_INTERVAL) * (this.r / this.settings.rmax);
        this.rt = Math.random() * this.hl;
        this.settings.rt = Math.random() + 1;
        this.stop = Math.random() * .2 + .4;
        this.settings.xdrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
        this.settings.ydrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
    }
    this.fade = function () {
        this.rt += this.settings.rt;
    }
    this.draw = function () {
        if (this.settings.blink && (this.rt <= 0 || this.rt >= this.hl)) {
            this.settings.rt = this.settings.rt * -1;
        } else if (this.rt >= this.hl) {
            this.reset();
        }

        var newo = 1 - (this.rt / this.hl);
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        context.closePath();

        var cr = this.r * newo;
        gradient = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, (cr <= 0 ? 1 : cr));
        gradient.addColorStop(0.0, 'rgba(255,255,255,' + newo + ')');
        gradient.addColorStop(this.stop, 'rgba(77,101,181,' + (newo * .6) + ')');
        gradient.addColorStop(1.0, 'rgba(77,101,181,0)');
        context.fillStyle = gradient;
        context.fill();
    }

    this.move = function () {
        this.x += (this.rt / this.hl) * this.dx;
        this.y += (this.rt / this.hl) * this.dy;
        if (this.x > WIDTH || this.x < 0) this.dx *= -1;
        if (this.y > HEIGHT || this.y < 0) this.dy *= -1;
    }

    this.getX = function () {
        return this.x;
    }
    this.getY = function () {
        return this.y;
    }
}

for (var i = 0; i < MAX_PARTICLES; i++) {
    pixies.push(new Stars());
    pixies[i].reset();
}

function draw() {
    context.clearRect(0, 0, WIDTH, HEIGHT);
    for (var i = 0; i < pixies.length; i++) {
        pixies[i].fade();
        pixies[i].move();
        pixies[i].draw();
    }
}

setInterval(draw, DRAW_INTERVAL);