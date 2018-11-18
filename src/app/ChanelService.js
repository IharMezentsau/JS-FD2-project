import {PubSubService} from "./PubSubService";

export class ChanelService {
	constructor() {}

	readReady(callresult, storage) { // сообщения получены - показывает
		if (callresult.error !== undefined) {
			console.log(callresult.error);
			return;
		} else {
			console.log(JSON.parse(callresult.result));
			return storage = JSON.parse(callresult.result);
			//console.log(storage);
		}
	}

	delChanel(el, channel, person, user) {
		if (channel&&person) {
			if (person[user]['chanel']&&person[user]['chanel'][el.name.substring(2)]) {
				let delChannel = person[user]['chanel'][el.name.substring(2)];
				for (let i = 0; i < channel[delChannel].length; i++) {
					if (channel[delChannel][i] == user) {
						channel[delChannel].splice(i, 1);
					};
				}
				person[user]['chanel'].splice(el.name.substring(2), 1);
			}
		}
	}

	cChanel(channel, person, user) {
		console.log('кнопка нажата')
		if (channel&&person&&user) {
			let channelInput = document.getElementById('channel-input');
			if (channelInput.value) {
				let inputText = channelInput.value.replace(/\s+/g,' ').trim();
				if (user in person) { //есть ли пользователь в списке
					if (inputText in channel) { //есть ли канал в списке
						if (channel[inputText]) { //пусто ли в канале
							if (channel[inputText].indexOf(user) == -1) { //есть ли пользователь в канале
								channel[inputText].push(user); //добавить пользователя в канал
							}
						} else { //если в канале пусто
							channel[inputText] = []; //создать в нем массив
							channel[inputText].push(user); //записать в него пользователя
						}
						if (person[user]['chanel']) { //есть ли каналы у пользователя
							if (person[user]['chanel'].indexOf(inputText) == -1) { //если у пользователя ненайден канал
								person[user]['chanel'].push(inputText);
							}
						} else { //если каналов у пользователя нет
							person[user]['chanel'] = [];
							person[user]['chanel'].push(inputText);
						}
					} else { //если канала нет в списке
						channel[inputText] = [];
						channel[inputText].push(user);
						if (person[user]['chanel']) { //есть ли каналы у пользователя
							if (person[user]['chanel'].indexOf(inputText) == -1) { //если у пользователя ненайден канал
								person[user]['chanel'].push(inputText);
							}
						} else { //если каналов у пользователя нет
							person[user]['chanel'] = [];
							person[user]['chanel'].push(inputText);
						}
					}
				}
			} else {
				console.log('Пустое поле')
			}
		}
	}

	checkChannel(evt) {
		let channel = evt.innerHTML;
		new PubSubService().pub('onEnterChannel', channel);
	}
}