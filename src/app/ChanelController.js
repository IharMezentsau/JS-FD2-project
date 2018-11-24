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
				(error, textStatus, errorStr) => {
					this.model.errorHandler(error, textStatus, errorStr);
				}
			)
			.then(
				response => {
					this.model.personTemp = this.service.readReady(response, this.model.personTemp)
					this.view.chanelList(this.model.personTemp, this.model.user); //this.model.user
					this.clickEvent (this.service, this.view, this.model, this.model.user);
					this.clickCreate (this.service, this.view, this.model, this.model.user);
				},
				(error, textStatus, errorStr) => {
					this.model.errorHandler(error, textStatus, errorStr);
				}
			);
	}
	
	clickEvent (service, view, model, user) {
		let list = document.getElementById('chanel-list');
		list.addEventListener("click", function(evt) {
			evt.preventDefault();
			console.log(evt.target.getAttribute('class'));
			if ((evt.target.getAttribute('class').indexOf('delete') != -1)||(evt.target.parentElement.getAttribute('class').indexOf('delete') != -1)) { // удаление канала
				service.delChanel((evt.target.getAttribute('class').indexOf('delete') != -1)?evt.target:evt.target.parentElement, model.chanelTemp, model.personTemp, user);
				view.disableButton();
				model.storeInfo(model.stringChanel)
				.then(
					response => {
						model.lockGetReady(response, model.stringChanel, model.chanelTemp)
						return model.storeInfo(model.stringPerson);
					},
					(error, textStatus, errorStr) => {
						model.errorHandler(error, textStatus, errorStr);
					})
				.then(
					response => {
						model.lockGetReady(response, model.stringPerson, model.personTemp)
						return model.getStorage(model.stringChanel);
					},
					(error, textStatus, errorStr) => {
						model.errorHandler(error, textStatus, errorStr);
					})
				.then(
					response => {
						model.chanelTemp = service.readReady(response, model.chanelTemp);
						return model.getStorage(model.stringPerson)
					},
					(error, textStatus, errorStr) => {
						model.errorHandler(error, textStatus, errorStr);
					})
				.then(
					response => {
						model.personTemp = service.readReady(response, model.personTemp);
						view.disableButton();
						view.chanelList(model.personTemp, user);
					},
					(error, textStatus, errorStr) => {
						model.errorHandler(error, textStatus, errorStr);
					})
			} else if (evt.target.getAttribute('class').indexOf('channel-link') != -1) { // переход на канал
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
					(error, textStatus, errorStr) => {
						model.errorHandler(error, textStatus, errorStr);
					})
				.then(
					response => {
						model.lockGetReady(response, model.stringPerson, model.personTemp)
						return model.getStorage(model.stringChanel);
					},
					(error, textStatus, errorStr) => {
						model.errorHandler(error, textStatus, errorStr);
					})
				.then(
					response => {
						model.chanelTemp = service.readReady(response, model.chanelTemp);
						return model.getStorage(model.stringPerson)
					},
					(error, textStatus, errorStr) => {
						model.errorHandler(error, textStatus, errorStr);
					})
				.then(
					response => {
						model.personTemp = service.readReady(response, model.personTemp);
						view.disableButton();
						view.chanelList(model.personTemp, user);
					},
					(error, textStatus, errorStr) => {
						model.errorHandler(error, textStatus, errorStr);
					})
		})
	}
}
