export class ChanelService {
	constructor() {

	}

	delChanel(el, channel, person, user) {
		if (channel&&person) {
			if (person[user]['chanel']&&person[user]['chanel'][el.name.substring(2)]) {
				//channel.splice(el.name.substring(2), 1);
				let delChannel = person[user]['chanel'][el.name.substring(2)];
				for (let i = 0; i < channel[delChannel].length; i++) {
					if (channel[delChannel][i] == user) {
						channel[delChannel].splice(i, 1);
						console.log(delChannel);
						console.log(channel);
					};
				}
				person[user]['chanel'].splice(el.name.substring(2), 1);
				console.log(person);
			}
		}
	}


}