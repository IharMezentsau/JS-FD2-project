export class ChanelView {
	constructor(root) {
		this.root = root;
		this.element = null;
	}

	render() {
		if(!this.element){
			this.root.innerHTML = `
			<section id="chanel" class="mdl-layout mdl-color--blue-grey-900">
				<div class="mdl-color--blue-grey-700 chanel-list" style="text-align:center">
					<h3 id="login"></h3>
					<ul id="chanel-list"></ul>
					<form action="#">
						<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
							<input class="mdl-textfield__input" type="text" id="sample3">
							<label class="mdl-textfield__label" for="sample3">Название нового канала...</label>
						</div>
						<br>
						<button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
							Создать
						</button>
					</form>
				</div>
			</section>
			`;
		}
	}

	chanelList(chanellist,loginlist,login) {
		let el = document.getElementById('chanel-list');
		if (el&&loginlist&&login) {
			let title = document.getElementById("login");
			if (title) {
				title.innerHTML = 'Здравствуйте, '+login;
			}
			for (let index = 0; index < loginlist[login]['chanel'].length; index++) {
				if (loginlist[login]['chanel']) {
					//loginlist['chanel'][i]
					let li = document.createElement("li"),
						span = document.createElement("span"),
						i = document.createElement("i"),
						text = document.createElement("a"),
						deleteLink = document.createElement("a");
					span.classList.add('mdl-chip');
					span.classList.add('mdl-chip--contact');
					span.classList.add('mdl-color--blue-grey-800');
					span.classList.add('mdl-chip--deletable');
					i.classList.add('mdl-chip__contact');
					i.classList.add('material-icons');
					i.classList.add('mdl-color--blue-grey-900');
					i.classList.add('mdl-color-text--blue-grey-400');
					i.innerHTML = 'group';
					text.classList.add('mdl-chip__text');
					text.classList.add('mdl-color-text--blue-grey-400');
					text.href = '#';
					text.innerHTML = loginlist[login]['chanel'][index];
					deleteLink.classList.add('mdl-chip__action');
					deleteLink.classList.add('delete');
					deleteLink.innerHTML = '<i class="material-icons">cancel</i>';
					el.appendChild(li);
					li.appendChild(span);
					span.appendChild(i);
					span.appendChild(text);
					span.appendChild(deleteLink);
					console.log(loginlist[login]['chanel'][index]);
				}
			}
			
			/*el.innerHTML = `
			<li class="mdl-chip mdl-chip--contact mdl-color--blue-grey-800 mdl-chip--deletable">
				<i class="mdl-chip__contact material-icons mdl-color--blue-grey-900 mdl-color-text--blue-grey-400">group</i>
				<a href="#" class="mdl-chip__text mdl-color-text--blue-grey-400"></a>
				<a href="#" class="mdl-chip__action"><i class="material-icons">cancel</i></a>
			</li>
			`;*/
		}
	}
}
