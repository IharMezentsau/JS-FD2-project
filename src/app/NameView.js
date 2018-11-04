export class NameView {
    constructor(root) {
        this.root = root;
        this.namelist = null;
        this.divwrapp = null;
    }

    render() {
        this.clearLocalStorage();
        this.divwrapp = document.getElementById("wrapp");
        this.span = document.createElement("span");
        this.span.innerHTML += `Добро пожаловать <span style="font-size: 20px; font-weight: bold; color: #00BCD4">${this.name}</span>`;
        this.divwrapp.appendChild(this.span);
        this.button = document.createElement('a');
        this.button.innerHTML += `Выйти`;
        this.button.setAttribute('class', 'close');
        this.button.setAttribute('href', 'index.html');
        this.divwrapp.appendChild(this.button);
    }

    siteBarNameList(arrName) {
        this.namelist = document.getElementById("namelist");
        for(let key in arrName) {
            this.namelist.innerHTML += `<a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">person</i>${key}</a>`;
        }
    }

    siteBarChannel() {
        this.changeChannel = document.getElementById("changeChannel");
        this.changeChannel.style.marginTop = '50px';
        this.buttonchangeChannel = document.createElement('a');
        this.buttonchangeChannel.innerHTML += `Сменить канал`;
        this.buttonchangeChannel.setAttribute('class', 'close');
        this.buttonchangeChannel.setAttribute('href', '#');
        this.changeChannel.appendChild(this.buttonchangeChannel);
    }

    channelName() {
        let channel = 'Общий';
        this.changeChannel = document.getElementById("nameChannel");
        this.textChannel = document.createElement("span");
        this.textChannel.innerText = `Канал: ${channel}`;
        this.changeChannel.appendChild(this.textChannel);
    }

    clearLocalStorage() {
        this.name = localStorage['authName'];
        if(this.name === localStorage['authName']) {
            localStorage.clear();
        }
    }
}