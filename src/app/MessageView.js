export class MessageView {
    constructor(root) {
        this.root = root;
        this.element = null;
        this.checkbox = null;
        this.listLocale = {
            newYork: {name: 'Нью - Йорк', UTC: '-5'},
            london: {name: 'Лондон', UTC: ' '},
            berlin: {name: 'Берлин', UTC: '+1'},
            minsk: {name: 'Минск', UTC: '+3'},
            tokyo: {name: 'Токио', UTC: '+9'},
            vladivostok: {name: 'Владивосток', UTC: '+10'},

        };
        this.checkedChangeHandler = null;
    }

    render(model, messages, locale) {
        // представление создает dom элементы в первый раз
        if (this.messages) {this.messages.textContent = '';};
        if (!this.element) {

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
            /*this.element = document.createElement('div');
            this.element.style.float = 'left';
            this.element.style.paddingTop = '5px';
            this.element.style.paddingLeft = '5px';
            this.root.appendChild(this.element);

            this.btnStop = document.createElement('button');
            this.btnStop.textContent = 'стоп';
            this.btnStop.addEventListener('click',
                e => this.checkedChangeHandler(false));
            this.element.appendChild(this.btnStop);

            this.btnStart = document.createElement('button');
            this.btnStart.textContent = 'старт';
            this.btnStart.style.marginLeft = '5px';
            this.btnStart.addEventListener('click',
                e => this.checkedChangeHandler(true));
            this.element.appendChild(this.btnStart);

            this.timeUTC = document.createElement("span");
            this.timeUTC.textContent = `(${this.listLocale[locale].name} GMT ${this.listLocale[locale].UTC})`;
            this.element.appendChild(this.timeUTC);

            this.element.appendChild(document.createElement('br'));

            this.svgClock = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
            this.svgClock.style.position = 'left';
            this.svgClock.setAttribute('width', "300");
            this.svgClock.setAttribute('height', "300");
            this.svgClock.setAttribute('float', "left");
            this.element.appendChild(this.svgClock);

            this.tablet = document.createElementNS("http://www.w3.org/2000/svg",'circle');
            this.tablet.setAttribute('fill', 'yellow');
            this.tablet.setAttribute('r', 150);
            this.tablet.setAttribute('cx', 150);
            this.tablet.setAttribute('cy', 150);
            this.svgClock.appendChild(this.tablet);

            for (let i = 12; i > 0; i--)  {
                this.newCirleNumber = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
                this.newCirleNumber.setAttribute('r', 25);
                this.newCirleNumber.setAttribute('cx',(150 + 120 * Math.sin(i * Math.PI / 6) +  'px'));
                this.newCirleNumber.setAttribute('cy', (150 - 120 * Math.cos(i * Math.PI / 6) + 'px'));
                this.newCirleNumber.setAttribute('fill', 'green');
                this.svgClock.appendChild(this.newCirleNumber);

                this.newNumber = document.createElementNS("http://www.w3.org/2000/svg", 'text');
                this.newNumber.textContent = i;
                this.newNumber.setAttribute('x',(142 + 120 * Math.sin(i * Math.PI / 6) +  'px'));
                this.newNumber.setAttribute('y',(156 - 120 * Math.cos(i * Math.PI / 6) + 'px'));
                this.svgClock.appendChild(this.newNumber);
*/
            }

            for ( let m = 0; m < messages.length; m++ ) {
                let message = messages[m],
                    author = document.createElement('b'),
                    comment = document.createElement('p');

                author.textContent = message.name;
                this.messages.appendChild(author);
                //alert(11);
                comment.textContent = message.mess;
                this.messages.appendChild(comment);


                /*$.messages.append('h2').text(message.name);
                $.messages.append('p').text(message.mess);
                $.messages.append('br');*/
            }
/*
            this.secondArrow = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
            this.secondArrow.setAttribute('x', 149);
            this.secondArrow.setAttribute('y', 30);
            this.secondArrow.setAttribute('width', 2);
            this.secondArrow.setAttribute('height', 120);
            this.secondArrow.setAttribute('rx', 1);
            this.secondArrow.setAttribute('ry', 1);
            this.svgClock.appendChild(this.secondArrow);

            this.minuteArrow = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
            this.minuteArrow.setAttribute('x', 147);
            this.minuteArrow.setAttribute('y', 50);
            this.minuteArrow.setAttribute('width', 6);
            this.minuteArrow.setAttribute('height', 100);
            this.minuteArrow.setAttribute('rx', 3);
            this.minuteArrow.setAttribute('ry', 3);
            this.svgClock.appendChild(this.minuteArrow);

            this.hourArrow = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
            this.hourArrow.setAttribute('x', 145);
            this.hourArrow.setAttribute('y', 75);
            this.hourArrow.setAttribute('width', 10);
            this.hourArrow.setAttribute('height', 75);
            this.hourArrow.setAttribute('rx', 5);
            this.hourArrow.setAttribute('ry', 5);
            this.svgClock.appendChild(this.hourArrow);
*/
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




