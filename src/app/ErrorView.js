export class ErrorView {
    constructor(root) {
        this.root = root;


        this.container = document.querySelector('header');

        console.log(document.getElementById('divMain'));

        document.getElementById('divMain').innerHTML = '<canvas id="star"> </canvas>';

        console.log(document.getElementById('divMain'));
        this.canvas = document.querySelector('#star');

        this.context = this.canvas.getContext('2d');

    }

    addAudio() {
        var audio = new Audio('http://stream.hoster.by:8081/pilotfm/pilot/icecast.audio');
        audio.play();
    }

    render() {
        //this.addAudio();
        document.getElementById('divMain').innerHTML = `
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
    }

    updatePage() {
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

    getContainer() {
        return document.querySelector('header');
    }

    getCanvas() {
        return document.querySelector('#star');
    }

    getContext() {
        return this.canvas.getContext('2d');
    }

}