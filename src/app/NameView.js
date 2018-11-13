import {PubSubService} from './PubSubService.js';

export class NameView {
    constructor(root) {
        this.root = root;
        this.namelist = null;
        this.divwrapp = null;
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
        this.button.setAttribute('href', 'index.html');
        this.divwrapp.appendChild(this.button);
    }

    getSmile() {
        $('#btnsmile').click((evt)=>{
            $('#get-smile').show("fast");
        });
        $(document).mousedown( function(event){
            if($(event.target).closest("#close").length )
                return;
            $("#get-smile").fadeOut("slow");
        });

        let formSendMessage = document.getElementById('formSendMessage');

        let sm = document.getElementById('Layer_1');
        sm.style.border = '2px solid white';
        sm.style.cursor = 'pointer';
        let smcoppy = sm.cloneNode(true);

        let sm3 = document.getElementById('Layer_2');
        sm3.style.border = '2px solid white';
        sm3.style.cursor = 'pointer';
        let smcoppy3 = sm3.cloneNode(true);

        let sm2 = document.getElementById('Layer_3');
        sm2.style.border = '2px solid white';
        sm2.style.cursor = 'pointer';
        let smcoppy2 = sm2.cloneNode(true);

        let sm1 = document.getElementById('big-smile-smiley');
        sm1.style.border = '2px solid white';
        sm1.style.cursor = 'pointer';
        let smcoppy1 = sm1.cloneNode(true);

        sm.addEventListener('click', (evt) => {
            formSendMessage.appendChild(smcoppy);
            formSendMessage.style.backgroundImage = "url('../img/smile6.svg')";
            formSendMessage.style.backgroundRepeat = "no-repeat";
            formSendMessage.style.backgroundPosition = "0% 50%";
            formSendMessage.style.backgroundSize = "20px";
            formSendMessage.style.cursor = "pointer";
        });

        sm1.addEventListener('click', (evt) => {
            formSendMessage.appendChild(smcoppy1);
            formSendMessage.style.backgroundImage = "url('../img/smile5.svg')";
            formSendMessage.style.backgroundRepeat = "no-repeat";
            formSendMessage.style.backgroundPosition = "0% 50%";
            formSendMessage.style.backgroundSize = "20px";
            formSendMessage.style.cursor = "pointer";
        });

        sm2.addEventListener('click', (evt) => {
            formSendMessage.appendChild(smcoppy2);
            formSendMessage.style.backgroundImage = "url('../img/smile3.svg')";
            formSendMessage.style.backgroundRepeat = "no-repeat";
            formSendMessage.style.backgroundPosition = "0% 50%";
            formSendMessage.style.backgroundSize = "20px";
            formSendMessage.style.cursor = "pointer";
        });

        sm3.addEventListener('click', (evt) => {
            formSendMessage.appendChild(smcoppy3);
            formSendMessage.style.backgroundImage = "url('../img/smile2.svg')";
            formSendMessage.style.backgroundRepeat = "no-repeat";
            formSendMessage.style.backgroundPosition = "0% 50%";
            formSendMessage.style.backgroundSize = "20px";
            formSendMessage.style.cursor = "pointer";
        });
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
        for(let key in arrName) {
            // this.namelist.innerHTML += `<a class="mdl-navigation__link" id="${counter+1}" href="#"><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">person</i>${key}</a>`;
            this.list = document.createElement('a');
            this.list.setAttribute('class', 'mdl-navigation__link');
            this.list.setAttribute('id', `${counter+1}`);
            this.list.setAttribute('href', '#');
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

    siteBarChannel() {
        this.changeChannel = document.getElementById("changeChannel");
        this.changeChannel.style.marginTop = '50px';
        this.buttonchangeChannel = document.createElement('a');
        this.buttonchangeChannel.innerHTML += `Change channel`;
        this.buttonchangeChannel.setAttribute('class', 'close');
        this.buttonchangeChannel.setAttribute('href', '#');
        this.changeChannel.appendChild(this.buttonchangeChannel);
    }

    channelName() {
        let channel = 'General';
        this.changeChannel = document.getElementById("nameChannel");
        this.textChannel = document.createElement("span");
        this.textChannel.innerText = `Channel: ${channel}`;
        this.changeChannel.appendChild(this.textChannel);
    }

    clearLocalStorage() {
        this.name = localStorage['authName'];
        if(this.name === localStorage['authName']) {
            localStorage.clear();
        }
    }
}