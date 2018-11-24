import {PubSubService} from './PubSubService.js';

export class NameView {
    constructor(root) {
        this.root = root;
        this.namelist = null;
        this.divwrapp = null;

        new PubSubService().sub('changeChannelOnClick',
            (inChannel) => this.textChannel.innerText = `Channel: ${inChannel}`);
    }

    render(user) {
        this.clearLocalStorage();
        this.divwrapp = document.getElementById("wrapp");
        this.span = document.createElement("span");
        $(this.span).addClass('welcomeSpan');
        this.span.innerHTML += `Welcome <span style="font-size: 20px; font-weight: bold; color: #000000">${user}</span>`;
        this.divwrapp.appendChild(this.span);
        this.button = document.createElement('a');
        this.button.innerHTML += `Exit`;
        this.button.setAttribute('class', 'close');
        this.button.addEventListener('click', () => new PubSubService().pub('onSingOut'));
        this.divwrapp.appendChild(this.button);
    }

    siteBarNameList(arrName) {
        const onDragStart = (event) => {
            event.dataTransfer.setData("text", event.target.id);
        };

        const onDrag = (event) => {
            event.preventDefault();
        };

        const onDragOver = (event) => {
            event.preventDefault();
        };

        const onDrop = (event) => {
            if (event.target.offsetHeight / 2> event.pageY - event.target.offsetTop) {
                event.target.insertAdjacentElement("beforebegin", document.getElementById(event.dataTransfer.getData("text")));
            }
            else {
                event.target.insertAdjacentElement("afterend", document.getElementById(event.dataTransfer.getData("text")));
            }
        };
        this.namelist = document.getElementById("namelist");
        let counter = 0;
        for(let key of arrName) {
            this.list = document.createElement('a');
            this.list.setAttribute('class', 'mdl-navigation__link');
            this.list.setAttribute('id', `${counter+1}`);
            this.list.setAttribute('draggable', true);
            this.list.ondragstart = onDragStart;
            this.list.ondrag = onDrag;
            this.list.ondragover = onDragOver;
            this.list.ondrop = onDrop;
            this.namelist.appendChild(this.list);
            this.icon = document.createElement('i');
            this.icon.setAttribute('class', 'mdl-color-text--blue-grey-400 material-icons');
            this.icon.setAttribute('role', 'presentation');
            this.icon.innerText = 'person';
            this.list.appendChild(this.icon);
            this.text = document.createTextNode(`${key}`);
            this.list.appendChild(this.text);
            counter++;
        }
    }

    groupName(channel) {
        this.changeChannel = document.getElementById("nameChannel");
        this.textChan = document.createElement("div");
        this.textChan.style.position = 'absolute';
        this.textChan.style.left = '70px';
        this.textChan.style.top = '60px';
        this.textChan.style.fontSize = '30px';
        this.textChan.innerText = `${channel}`;
        this.changeChannel.appendChild(this.textChan);
    }

    channelName() {
        let inChannel = 'general';
        this.changeChannel = document.getElementById("nameChannel");
        this.textChannel = document.createElement("span");
        this.textChannel.innerText = `Channel: ${inChannel}`;
        this.changeChannel.appendChild(this.textChannel);
    }

    clearLocalStorage() {
        //this.name = localStorage['authName'];
        /*if(this.name === localStorage['authName']) {
            localStorage.clear();
        }*/
    }
}
