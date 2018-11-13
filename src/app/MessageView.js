import {PubSubService} from "./PubSubService";

export class MessageView {
    constructor(root) {
        this.root = root;
        this.element = null;
    }

    render(messages, user) {
        // представление создает dom элементы в первый раз

        if (this.btnSendMessage === undefined) {
            this.root.innerHTML = `<header class="header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
                <div class="mdl-layout__header-row">
                    <span class="mdl-layout-title">Dialog</span>
                    <div class="mdl-layout-spacer"></div>
                    <div id="wrapp"></div>
                </div>
            </header>
            <div class="drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
                <header class="drawer-header">
                   <img src="img/user.jpg" class="avatar">
                   <div id="nameChannel"></div>
                   <div class="avatar-dropdown">
                       <span>hello@example.com</span>
                       <div class="mdl-layout-spacer"></div>
                       <button id="accbtn" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                           <i class="material-icons" role="presentation">arrow_drop_down</i>
                           <span class="visuallyhidden">Accounts</span>
                       </button>
                       <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="accbtn">
                           <li class="mdl-menu__item">hello@example.com</li>
                           <li class="mdl-menu__item">info@example.com</li>
                           <li class="mdl-menu__item"><i class="material-icons">add</i>Add another account...</li>
                       </ul>
                   </div>
                </header>
                <div id="nameChannel"></div>
                <nav class="navigation mdl-navigation mdl-color--blue-grey-800">
                   <div id="namelist"></div>
                   <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">add</i>Add</a>
                   <div id="changeChannel"></div>
                   <div class="mdl-layout-spacer"></div>
                   <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">help_outline</i><span class="visuallyhidden">Help</span></a>
                </nav>
            </div>
            <main class="mdl-layout__content mdl-color--grey-100">
                <div class="mdl-grid content">
                    <div class="message-list graphs mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--12-col">
                        <ul id="listMessages" class="list-three mdl-list">
                        
                        </ul>
                    </div>
                    <div class="graphs mdl-cell mdl-cell--10-col">
                        <form>
                            <div class="mdl-textfield mdl-js-textfield" style="width: 100%">
                                <textarea class="mdl-textfield__input" type="text" rows= "1" 
                                    id="formSendMessage"></textarea>
                                <label class="mdl-textfield__label" for="formSendMessage">Text lines...</label>
                            </div>
                        </form>
                    </div>
                    <div class="mdl-cell mdl-cell--2-col">
                        <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab">
                            <i class="material-icons">insert_emoticon</i>
                        </button>
                        <button id="btnSendMessage" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab">
                            <i class="material-icons">message</i>
                            <div class="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active"
                                style="display: none"></div>
                        </button>
                    </div>
                </div>
            </main>`;
            this.btnSendMessage = document.getElementById('btnSendMessage');
            this.formSendMessage = document.getElementById('formSendMessage');
            this.listMessages = document.getElementById('listMessages');
            this.nameList = $('#namelist');
            this.nameChannel = $('#nameChannel');
            this.listMessages.parentNode.addEventListener('scroll', (a) => this.loadOldMessages(this.listMessages));
            $(this.listMessages).on('DOMNodeInserted', this.scrollListMessage.bind(this));

            new PubSubService().sub('clickSendMessage', () => {
                $('#btnSendMessage > i').toggle(false);
                $('#btnSendMessage > div').toggle(true);
                $('#btnSendMessage').attr("disabled", "disabled");
            });
            new PubSubService().sub('endSendMessage', (answer) => {
                $('#btnSendMessage > i').toggle(true);
                $('#btnSendMessage > div').toggle(false);
                $('#btnSendMessage').removeAttr("disabled");
                if (answer === 'OK') $('#formSendMessage').val("");
            });
        }
        this.renderMessages(messages, user);
        componentHandler.downgradeElements(document.querySelector(".mdl-layout"));
        componentHandler.upgradeDom();
    }

    renderMessages(messages, user) {
        for (let m = 0; m < messages.length; m++) {

            let message = messages[m],
                liMessage = document.createElement('li'),
                spanMessage = document.createElement('span'),
                iMessage = document.createElement('i'),
                spanNameUser = document.createElement('span'),
                spanTextMessage = document.createElement('span');

            liMessage.className = 'mdl-list__item mdl-list__item--three-line';
            this.listMessages.appendChild(liMessage);

            spanMessage.appendChild(iMessage);

            spanMessage.className = 'mdl-list__item-primary-content';
            liMessage.appendChild(spanMessage);

            spanNameUser.textContent = message.name;
            spanMessage.appendChild(spanNameUser);

            if (message.name === 'system') {
                spanNameUser.style.color = 'red';
                spanTextMessage.style.color = 'red';
                iMessage.style.color = 'red';
                iMessage.className = 'material-icons';
                iMessage.textContent = 'announcement';
            } else {
                iMessage.textContent = 'person';
                iMessage.className = 'material-icons mdl-list__item-avatar';
            }

            if (message.name === user) {
                $(iMessage).addClass('avatarAuthor');
                $(liMessage).addClass('liAuthor');
            } else {
                this.stopPlayNewMessage();
            }

            spanTextMessage.textContent = message.mess;
            spanTextMessage.className = 'mdl-list__item-text-body';
            spanMessage.appendChild(spanTextMessage);

            $(liMessage).hide().show(500);
        }
    }

    stopPlayNewMessage() {
        window.navigator.vibrate(500);
        let a =  new Audio('./audio/newMessage.mp3');
        a.onended = () => {
            a.pause();
            a.currentTime = 0;
        };
        a.play();
    }

    scrollListMessage() {
        let heightUl = $(this.listMessages).height(),
            heightMessage = $(this.listMessages).find('li:first').height(),
            positionUl = $(this.listMessages).position().top,
            viewBox = $(this.listMessages).parent().height();
        if (heightUl + positionUl - viewBox < heightMessage) {
            this.listMessages.scrollIntoView(false);
        }
    }

    loadOldMessages(a) {
        //console.log(a.getBoundingClientRect());

        /*if (/*a.scrollHeight === a.clientHeight + a.scrollTop*///a.getBoundingClientRect().y < 90) {
            //a.scrollIntoView(false);
          //  console.log(a.getBoundingClientRect());
        //}*/
    }

}
