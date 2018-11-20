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
						<form>
							<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
								<input class="mdl-textfield__input" type="text" id="channel-input">
								<label class="mdl-textfield__label" for="channel-input">Название нового канала...</label>
							</div>
							<br>
							<button id="create-channel" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
								Создать
							</button>
						</form>
					</div>
				</section>
			`;
      componentHandler.upgradeDom();
		}
	}

	chanelList(loginlist,login) {
		let el = document.getElementById('chanel-list'),
			channelInput = document.getElementById('channel-input');
		el.innerHTML = '';
		channelInput.value = '';
		if (el&&loginlist&&login) {
			let title = document.getElementById("login");
			if (title) {
				title.innerHTML = 'Здравствуйте, '+login;
			}
			if ('chanel' in loginlist[login]) {
				if (loginlist[login]['chanel'].length > 0) {
					for (let index = 0; index < loginlist[login]['chanel'].length; index++) {
						let li = document.createElement("li"),
							span = document.createElement("span"),
							i = document.createElement("i"),
							text = document.createElement("a"),
							deleteLink = document.createElement("button");
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
						text.classList.add('channel-link');
						text.href = '#';
						text.innerHTML = loginlist[login]['chanel'][index];
						deleteLink.classList.add('mdl-chip__action');
						deleteLink.classList.add('delete');
						deleteLink.name = 'ch' + index;
						deleteLink.innerHTML = '<i class="material-icons">cancel</i>';
						el.appendChild(li);
						li.appendChild(span);
						span.appendChild(i);
						span.appendChild(text);
						span.appendChild(deleteLink);
					}
				}
				else {
					let li = document.createElement("li");
					li.innerHTML = 'У пользователя '+login+' пока нет каналов';
					el.appendChild(li);
				}
			} else {
				let li = document.createElement("li");
				li.innerHTML = 'У пользователя '+login+' пока нет каналов';
				el.appendChild(li);
			}
		}
	}

	disableButton() {
		let createChannel = document.getElementById('create-channel'),
			delChannel = document.getElementsByClassName('delete');
		
		if (createChannel) {
			if (!createChannel.hasAttribute("disabled")) {
				createChannel.setAttribute("disabled","");
			} else {
				createChannel.removeAttribute("disabled")
			}
		}
		if (delChannel) {
			for (let i = 0; i < delChannel.length; i++) {
				if (!delChannel[i].hasAttribute("disabled")) {
					delChannel[i].setAttribute("disabled","");
				} else {
					delChannel[i].removeAttribute("disabled")
				}
			}
		}
	}
}
