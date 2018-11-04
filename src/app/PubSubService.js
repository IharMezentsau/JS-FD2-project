export class PubSubService {
    constructor() {
        if (!PubSubService.instance) {
            PubSubService.instance = this;
            this.listeners = {};
        }
        // Initialize object
        return PubSubService.instance;
    }

    pub(topic, data) {
        const listeners = this.listeners[topic] || [];
        for (let listener of listeners) {
            listener(data);
        }
    }

    sub(topic, listener) {
        if (typeof listener !== 'function') return;
        const listeners = this.listeners[topic] || [];
        const index = listeners.indexOf(listener);
        if (index == -1) {
            listeners.push(listener);
            this.listeners[topic] = listeners;
        }
    }

    remove(topic, listener) {
        const listeners = this.listeners[topic] || [];
        const index = listeners.indexOf(listener);
        if (index > -1) {
            listeners.splice(index, 1);
            this.listeners[topic] = listeners;
        }
    }

    removeAll(topic) {
        delete this.listeners[topic];
    }
}
