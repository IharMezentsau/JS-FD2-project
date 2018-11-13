export class ChanelController {
	constructor(model, view, service) {
		this.model = model;
		this.view = view;
		this.service = service;
		this.view.render();
		this.model.getStorage(this.model.stringChanel)
			.then(response => {
				this.model.chanelTemp = JSON.parse(response.result)
				console.log(this.model.chanelTemp);
				return this.model.getStorage(this.model.stringPerson)
			})
			.then(response => {
				this.model.personlTemp = JSON.parse(response.result)
				console.log(this.model.personlTemp);
				this.view.chanelList(this.model.personlTemp,"vika");
				this.delEvent (this.service, this.view, this.model, "vika");
			});
	}
	
	// удаление канала
	delEvent (service, view, model, user) {
		let list = document.getElementById('chanel-list');
		list.addEventListener("click", function(evt) {
			if (evt.target.parentElement.classList.value.indexOf('delete') != -1) {
				service.delChanel(evt.target.parentElement, model.chanelTemp, model.personlTemp, user);
				view.chanelList(model.personlTemp, user);
			}
		})
	}
}
