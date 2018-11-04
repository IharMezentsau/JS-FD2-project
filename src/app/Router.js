import {MessageController} from "./MessageController";
import {MessageModel} from "./MessageModel";
import {MessageView} from "./MessageView";
import {MessageService} from "./MessageService";

import {NameController} from "./NameController";
import {NameModel} from "./NameModel";
import {NameView} from "./NameView";

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
    '#auth': {
        runController: rootElement => {
            new AuthController(
                new AuthModel(),
                new AuthView(rootElement),
            );
        }
    },
    '#dialog': {
        runController: rootElement => {
            new MessageController(
                new MessageModel(),
                new MessageView(rootElement),
                new MessageService(),
            );
            new NameController(
                new NameModel(),
                new NameView(rootElement),
            );
        }
    },

}, document.getElementById('divMain')).navigateTo('#auth');
