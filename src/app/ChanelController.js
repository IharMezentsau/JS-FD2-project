export class ChanelController {
	constructor(model, view, service) {
		this.model = model;
		this.view = view;
		this.service = service;
		this.view.render();
		this.model.getStorage(this.model.stringChanel)
			.then(
				response => {
					this.model.chanelTemp = this.service.readReady(response, this.model.chanelTemp)
					return this.model.getStorage(this.model.stringPerson)
				},
				error => {
					new PubSubService().pub('onError', error.status);
				}
			)
			.then(
				response => {
					this.model.personTemp = this.service.readReady(response, this.model.personTemp)
					this.view.chanelList(this.model.personTemp, this.model.user); //this.model.user
					this.clickEvent (this.service, this.view, this.model, this.model.user);
					this.clickCreate (this.service, this.view, this.model, this.model.user);
				},
				error => {
					new PubSubService().pub('onError', error.status);
				}
			);
	}
	
	clickEvent (service, view, model, user) {
		let list = document.getElementById('chanel-list');
		list.addEventListener("click", function(evt) {
			evt.preventDefault();
			if (evt.target.classList.value.indexOf('delete') != -1) { // удаление канала
				service.delChanel(evt.target, model.chanelTemp, model.personTemp, user);
				view.disableButton();
				model.storeInfo(model.stringChanel)
				.then(
					response => {
						model.lockGetReady(response, model.stringChanel, model.chanelTemp)
						return model.storeInfo(model.stringPerson);
					},
					error => {
						new PubSubService().pub('onError', error.status);
					})
				.then(
					response => {
						model.lockGetReady(response, model.stringPerson, model.personTemp)
						return model.getStorage(model.stringChanel);
					},
					error => {
						new PubSubService().pub('onError', error.status);
					})
				.then(
					response => {
						model.chanelTemp = service.readReady(response, model.chanelTemp);
						return model.getStorage(model.stringPerson)
					},
					error => {
						new PubSubService().pub('onError', error.status);
					})
				.then(
					response => {
						model.personTemp = service.readReady(response, model.personTemp);
						view.disableButton();
						view.chanelList(model.personTemp, user);
					},
					error => {
						new PubSubService().pub('onError', error.status);
					})
			} else if (evt.target.classList.value.indexOf('channel-link') != -1) { // переход на канал
				service.checkChannel(evt.target);
			}
		})
	}

	clickCreate (service, view, model, user) {
		let button = document.getElementById('create-channel');
		button.addEventListener("click", function(evt) {
			evt.preventDefault();
			service.cChanel(model.chanelTemp, model.personTemp, user);
			view.disableButton();
			model.storeInfo(model.stringChanel)
				.then(
					response => {
						model.lockGetReady(response, model.stringChanel, model.chanelTemp)
						return model.storeInfo(model.stringPerson);
					},
					error => {
						new PubSubService().pub('onError', error.status);
					})
				.then(
					response => {
						model.lockGetReady(response, model.stringPerson, model.personTemp)
						return model.getStorage(model.stringChanel);
					},
					error => {
						new PubSubService().pub('onError', error.status);
					})
				.then(
					response => {
						model.chanelTemp = service.readReady(response, model.chanelTemp);
						return model.getStorage(model.stringPerson)
					},
					error => {
						new PubSubService().pub('onError', error.status);
					})
				.then(
					response => {
						model.personTemp = service.readReady(response, model.personTemp);
						view.disableButton();
						view.chanelList(model.personTemp, user);
					},
					error => {
						new PubSubService().pub('onError', error.status);
					});
		})
	}
}
