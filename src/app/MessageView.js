export class MessageView {
    constructor(root) {
        this.root = root;
        this.element = null;
        this.checkbox = null;
        this.checkedChangeHandler = null;
    }

    render(model, messages) {
        // представление создает dom элементы в первый раз
        //if (this.messages) {this.messages.textContent = '';};
        if (this.listMessages !== undefined) this.listMessages.textContent = '';

        if (this.btnSendMessage === undefined) {
            this.root.innerHTML = `<header class="header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
                <div class="mdl-layout__header-row">
                    <span class="mdl-layout-title">Dialog</span>
                    <div class="mdl-layout-spacer"></div>
                    <div class="wrapp">



                        <a class="login-link" href="#">Вход</a>

                    </div>
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
                        <label class="mdl-button mdl-js-button mdl-button--icon" for="search">
                            <i class="material-icons">search</i>
                        </label>
                        <div class="mdl-textfield__expandable-holder">
                            <input class="mdl-textfield__input" type="text" id="search">
                            <label class="mdl-textfield__label" for="search">Enter your query...</label>
                        </div>
                    </div>
                    <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="hdrbtn">
                        <i class="material-icons">more_vert</i>
                    </button>
                    <ul class="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" for="hdrbtn">
                        <li class="mdl-menu__item">About</li>
                        <li class="mdl-menu__item">Contact</li>
                        <li class="mdl-menu__item">Legal information</li>
                    </ul>
                </div>
            </header>
            <div class="drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
                <header class="drawer-header">
                    <img src="img/user.jpg" class="avatar">
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
                <nav class="navigation mdl-navigation mdl-color--blue-grey-800">

                    <div class="niga"></div>

                    <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">person</i>Bryan Cranston</a>

                    <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">add</i>Add</a>
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
                                <textarea  class="mdl-textfield__input" type="text" rows= "1" 
                                    id="formSendMessage" ></textarea>
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
                        </button>
                    </div>
                </div>
            </main>`;
            this.btnSendMessage = document.getElementById('btnSendMessage');
            this.formSendMessage = document.getElementById('formSendMessage');
            this.listMessages = document.getElementById('listMessages');
        };

        /*if (!this.element) {

            this.element = document.createElement('div');
            this.element.id = 'conteinerMessages';
            this.root.appendChild(this.element);

            this.messages = document.createElement('div');
            this.messages.id = 'conteinerMessage';
            this.messages.style.width = '500px';
            this.messages.style.height = '500px';
            this.messages.style.borderColor = 'black';
            this.messages.style.borderStyle = 'solid';
            this.element.appendChild(this.messages);

            this.inputField = document.createElement('input');
            this.inputField.id = 'newMessage';
            this.element.appendChild(this.inputField);

            this.sendButton = document.createElement('button');
            this.sendButton.textContent = 'Отправить';
            this.sendButton.addEventListener('click',
                e => this.checkedChangeHandler(handler));
            this.element.appendChild(this.sendButton);
/////////////////////////////////////////////////////////////////

*/
            //}

            for ( let m = 0; m < messages.length; m++ ) {
                let message = messages[m],
                    liMessage = document.createElement('li'),
                    spanMessage = document.createElement('span'),
                    iMessage = document.createElement('i'),
                    spanNameUser = document.createElement('span'),
                    spanTextMessage = document.createElement('span'),
                    spanAddColumn = document.createElement('span'),
                    aAddColumn = document.createElement('a'),
                    iAddColumn = document.createElement('i'),
                    author = document.createElement('b'),
                    comment = document.createElement('p');

                liMessage.className = 'mdl-list__item mdl-list__item--three-line';
                this.listMessages.appendChild(liMessage);

                spanMessage.className = 'mdl-list__item-primary-content';
                liMessage.appendChild(spanMessage);

                iMessage.className = 'material-icons  mdl-list__item-avatar';
                iMessage.textContent = 'person';
                spanMessage.appendChild(iMessage);

                spanNameUser.textContent = message.name;
                spanMessage.appendChild(spanNameUser);

                spanTextMessage.textContent = message.mess;
                spanTextMessage.className = 'mdl-list__item-text-body';
                spanMessage.appendChild(spanTextMessage);

                spanAddColumn.className = 'mdl-list__item-secondary-content';
                liMessage.appendChild(spanAddColumn);

                aAddColumn.className = 'mdl-list__item-secondary-action';
                aAddColumn.href = '#';
                liMessage.appendChild(aAddColumn);

                iAddColumn.className = 'material-icons';
                iAddColumn.textContent = 'star';
                aAddColumn.appendChild(iAddColumn);

            }

        }
        /*function showMessages() {
            let str='';
            for ( let m=0; m<messages.length; m++ ) {
                let message=messages[m];
                str+="<b>"+escapeHTML(message.name)+":</b> "
                    +escapeHTML(message.mess)+"<br />";
            }
            document.getElementById('IChat').innerHTML=str;
        }

        function readReady(callresult) { // сообщения получены - показывает
            if ( callresult.error!=undefined )
                alert(callresult.error);
            else {
                messages=[];
                if ( callresult.result!="" ) { // либо строка пустая - сообщений нет
                    // либо в строке - JSON-представление массива сообщений
                    messages=JSON.parse(callresult.result);
                    // вдруг кто-то сохранил мусор вместо LOKTEV_CHAT_MESSAGES?
                    if ( !Array.isArray(messages) )
                        messages=[];
                }
                showMessages();
            }
        }

        function escapeHTML(text) {
            if ( !text )
                return text;
            text=text.toString()
                .split("&").join("&amp;")
                .split("<").join("&lt;")
                .split(">").join("&gt;")
                .split('"').join("&quot;")
                .split("'").join("&#039;");
            return text;
        }
        // получает сообщения с сервера и потом показывает
        function refreshMessages() {
            $.ajax( {
                    url : ajaxHandlerScript,
                    type : 'POST', dataType:'json',
                    data : { f : 'READ', n : stringName },
                    cache : false,
                    success : readReady,
                    error : errorHandler
                }
            );
        }
        refreshMessages();
*/
        // и обновляет время по данным из модели
        /*this.secondArrow.style.transform = `rotate(${model.date.getSeconds() * 6}deg)`;
        this.secondArrow.style.transformOrigin = '150px 150px 0';
        this.minuteArrow.style.transform = `rotate(${model.date.getMinutes() * 6}deg)`;
        this.minuteArrow.style.transformOrigin = '150px 150px 0';
        this.hourArrow.style.transform = `rotate(${(model.date.getHours() + model.date.getTimezoneOffset() / 60 +
            Number(this.listLocale[locale].UTC) ) * 30 + model.date.getMinutes() * 0.5}deg)`;
        this.hourArrow.style.transformOrigin = '150px 150px 0';*/


    setChangeHandler(handler) {
        this.checkedChangeHandler = handler;
    }

    /*constructor(root) {
        this.root = root;
        this.element = null;
        this.checkbox = null;
        this.checkedChangeHandler = null;

        this.element = document.createElement('div');
        this.element.id = 'conteinerMessages';
        this.root.appendChild(this.element);

        this.messages = document.createElement('div');
        this.messages.id = 'conteinerMessage';
        this.element.appendChild(this.messages);

        this.inputField = document.createElement('input');
        this.inputField.id = 'newMessage';
        this.element.appendChild(this.inputField);

        this.sendButton = document.createElement('button');
        this.sendButton.addEventListener('click',
            e => this.checkedChangeHandler(handler));
        this.element.appendChild(this.sendButton);

    }

    render(model) {
        // представление создает dom элементы в первый раз
        if (!this.element) {
            this.showMessage(model.messages);
        }
    }

    showMessage(messages) {
        for ( let m = 0; m < messages.length; m++ ) {
            let message = messages[m];

            this.author = document.createElement('h2');
            this.author.textContent = message.name;
            this.messages.appendChild(this.author);

            this.message = document.createElement('p');
            this.message.textContent = message.mess;
            this.messages.appendChild(this.message);
        }
    }

    setChangeHandler(handler) {
        this.checkedChangeHandler = handler;
    }
*/
}




