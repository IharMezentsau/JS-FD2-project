export class ChanelController {
	constructor(model, view) {
			this.model = model;
			this.view = view;
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
					this.view.chanelList(this.model.chanelTemp,this.model.personlTemp,"vika");
				});
	}
}
