import {MessageController} from "./MessageController";
import {MessageModel} from "./MessageModel";
import {MessageView} from "./MessageView";
import {MessageService} from "./MessageService";

import {AuthController} from "./AuthController";
import {AuthModel} from "./AuthModel";
import {AuthView} from "./AuthView";

export class Router {
    constructor(map, rootElement) {
        this.map = map;
        this.rootElement = rootElement;
        // Подписаться на событие hashchange
        window.addEventListener('hashchange', this.onhashchange.bind(this));
    }

    onhashchange(e) {
        const activeHash = document.location.hash;
        // Отрисовать страницу для нового адреса
        this._route(activeHash);
    }

    _route(route) {
        const settings = this.map[route];
        if (settings) {
            this.rootElement.innerHTML = '';
            // запустить контроллер страницы,
            // которая соответствует адресу,
            // на который нужно перейти
            settings.runController(this.rootElement);
        }
    }

    navigateTo(route) {
        // Выполнить начальную навигацию на адрес по умолчанию
        if (document.location.hash === route && this.loaded) return;
        this._route(route);
        document.location.hash = route;
        this.loaded = true;
    }
}

new Router({
    '#newYork': {
        runController: rootElement => {
            new MessageController(
                new MessageModel(),
                new MessageView(rootElement),
                'newYork');
        }
    },
    '#london': {
        runController: rootElement => {
            new MessageController(
                new MessageModel(),
                new MessageView(rootElement),
                'london');
        }
    },
    '#berlin': {
        runController: rootElement => {
            new MessageController(
                new MessageModel(),
                new MessageView(rootElement),
                'berlin');
        }
    },
    '#dialog': {
        runController: rootElement => {
            new MessageController(
                new MessageModel(),
                new MessageView(rootElement),
                new MessageService(),
                'dialog');
            new AuthController(
                new AuthModel(),
                new AuthView(),
                'dialog');
        }
    },
    '#tokyo': {
        runController: rootElement => {
            new MessageController(
                new MessageModel(),
                new MessageView(rootElement),
                'tokyo');
        }
    },
    '#vladivostok': {
        runController: rootElement => {
            new MessageController(
                new MessageModel(),
                new MessageView(rootElement),
                'vladivostok');
        }
    },

}, /*document.body*/document.getElementById('divMain')/*getElementById('qq')*/).navigateTo('#dialog');

/*constructor(map, rootElement) {
    this.map = map;
    this.rootElement = rootElement;
    // Подписаться на событие hashchange
    window.addEventListener('hashchange', this.onhashchange.bind(this));
}

onhashchange(e) {
    const activeHash = document.location.hash;
    // Отрисовать страницу для нового адреса
    this._route(activeHash);
}

_route(route) {
    const settings = this.map[route];
    if (settings) {
        this.rootElement.innerHTML = '';
        // запустить контроллер страницы,
        // которая соответствует адресу,
        // на который нужно перейти
        settings.runController(this.rootElement);
    }
}

navigateTo(route) {
    // Выполнить начальную навигацию на адрес по умолчанию
    if (document.location.hash === route && this.loaded) return;
    this._route(route);
    document.location.hash = route;
    this.loaded = true;
}
}

new Router({
/*'#sendMessage': {
    runController: rootElement => {
        new MessageController(
            new MessageModel(),
            new MessageView(rootElement, new MessageService()),
        );
    }
},*/
 /*   '#showMessage': {
        runController: rootElement => {
            new MessageController(
                new MessageModel(),
                new MessageView(rootElement),
                'london');
        }
    },
    /*'#berlin': {
        runController: rootElement => {
            new TClockControllerButtons(
                new TClock(),
                new TClockViewSVG(rootElement),
                'berlin');
        }
    },
    '#minsk': {
        runController: rootElement => {
            new TClockControllerButtons(
                new TClock(),
                new TClockViewSVG(rootElement),
                'minsk');
        }
    },
    '#tokyo': {
        runController: rootElement => {
            new TClockControllerButtons(
                new TClock(),
                new TClockViewSVG(rootElement),
                'tokyo');
        }
    },
    '#vladivostok': {
        runController: rootElement => {
            new TClockControllerButtons(
                new TClock(),
                new TClockViewSVG(rootElement),
                'vladivostok');
        }
    },*/

//}, document.body);//.navigateTo('#minsk');
