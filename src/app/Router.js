import {PubSubService} from "./PubSubService";

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

import {ErrorController} from "./ErrorController";
import {ErrorModel} from "./ErrorModel";
import {ErrorView} from "./ErrorView";

import {ChanelController} from "./ChanelController";
import {ChanelModel} from "./ChanelModel";
import {ChanelView} from "./ChanelView";
import {ChanelService} from "./ChanelService";

export class Router {
    constructor(map, rootElement) {
        $(window).on("beforeunload", function() {
            return "Вы уверены, что хотите покинуть страницу?";
        });
        this.map = map;
        this.rootElement = rootElement;
        this.data = {};
        new PubSubService().sub('onAuthUser', user => {
            this.data.user = user;
            // Для Андрея
            location.hash = `channel`;
        });
        // Для Андрея, когда активируешь канал вставишь в метод new PubSubService().pub('onEnterChannel', channel)
        new PubSubService().sub('onEnterChannel', channel => {
            this.data.channel = channel;
            location.hash = `dialog`;
        });
        // Для ВСЕХ, Вставить в свой код new PubSubService().pub('onError', error) и передать код нужной ошибки
        new PubSubService().sub('onError', error => {
            this.data.error = error;
            location.hash = `error`;
        });
        //Для выхода
        new PubSubService().sub('onSingOut', () => {
            this.data = {};
            location.hash = `auth`;
        });

        // Подписаться на событие hashchange
        window.addEventListener('hashchange', this.onhashchange.bind(this));
    }

    onhashchange(e) {
        let activeHash = window.location.hash;
        // Отрисовать страницу для нового адреса
        new PubSubService().pub('clearIntervalMessages');
        new PubSubService().pub('clearIntervalError');
        if (!(activeHash in this.map)) {
            activeHash = '#error';
            this.data.error = 404;
        }
        this._route(activeHash);
    }

    _route(route) {
        const settings = this.map[route];
        if (settings) {
            new PubSubService().pub('stopErrorAudio');
            this.rootElement.innerHTML = '';
            // запустить контроллер страницы,
            // которая соответствует адресу,
            // на который нужно перейти
            settings.runController(this.rootElement, this.data);
        }
    }

    navigateTo(route, data) {
        /*if (navigator.appName === 'Microsoft Internet Explorer' ||
            !!(navigator.userAgent.match(/Trident/) ||
                navigator.userAgent.match(/rv:11/)) ||
            (typeof $.browser !== "undefined" && $.browser.msie === 1)) {
            route = '#error';
            this.data.error = 'ieError';
        };*/
        // Выполнить начальную навигацию на адрес по умолчанию
        if (window.location.hash === route && this.loaded) return;
        this._route(route);
        window.location.hash = route;
        this.loaded = true;
    }
}

new Router({
    '#auth': {
        runController: (rootElement, data) => {
            if (data.user) window.location.hash = '#channel';
            new AuthController(
                new AuthModel(),
                new AuthView(rootElement),
            );
        }
    },
    '#channel': {
        runController: (rootElement, data) => {
            if (data.user === undefined)  {
                new PubSubService().pub('onError', 401);
            } else {
                new ChanelController(
                    new ChanelModel(data.user),
                    new ChanelView(rootElement),
                    new ChanelService()
                );
            }
        }
    },
    '#dialog': {
        runController: (rootElement, data) => {
            // Проверка авторизации
            if (data.user === undefined)  {
                new PubSubService().pub('onError', 401);
            } else if (data.channel === undefined) {
                location.hash = `channel`;
            } else {
                new MessageController(
                    new MessageModel(data),
                    new MessageView(rootElement),
                    new MessageService(),
                );
                new NameController(
                    new NameModel(data),
                    new NameView(rootElement),
                );
            }
        }
    },
    '#error': {
        runController: (rootElement, data) => {
            new ErrorController(
                new ErrorModel(data.error),
                new ErrorView(rootElement),
            );
        }
    },
}, document.getElementById('divMain')).navigateTo('#auth');
