import {PubSubService} from "./PubSubService";

export class MessageView {
    constructor(root) {
        this.root = root;
        this.element = null;
        this.smile = {
            sm1: `<svg version="1.1" data-smileid="sm1" id="big-smile-smiley" width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
	 y="0px" viewBox="0 0 1010 1010" enable-background="new 0 0 1010 1010" xml:space="preserve">
<g id="big-smile-smiley-big-smile-smiley">
	<circle id="big-smile-smiley-label" fill="#7CCACB" cx="505" cy="505" r="505"/>
	<g id="big-smile-smiley-happy-message">
		<g>
			<path fill="#FBCD64" d="M787.7959,505c0,156.1719-126.624,282.7959-282.7959,282.7959
				c-156.1929,0-282.8008-126.624-282.8008-282.7959c0-156.1929,126.6079-282.8066,282.8008-282.8066
				C661.1719,222.1934,787.7959,348.8071,787.7959,505z"/>
		</g>
		<g>
			<g>
				<g>
					<path fill="#BC9A4B" d="M689.4121,413.8062c-11.7217-27.7989-38.9551-45.7085-69.3232-45.7085c-0.2803,0-0.5401,0-0.8203,0
						c-30.5762,0-57.8194,17.915-69.4786,45.7294c-2.8662,6.8624,0.3633,14.753,7.2256,17.629
						c6.8633,2.8813,14.7432-0.3736,17.6192-7.2105c9.0429-21.5747,29.6621-29.2109,44.8105-29.2109c0.0723,0,0.1562,0,0.2285,0
						c15.252,0.104,35.7676,7.5273,44.9141,29.2319c2.1699,5.1392,7.1533,8.2432,12.4277,8.2432
						c1.7238,0,3.5098-0.3423,5.2119-1.064C689.0801,428.5542,692.2988,420.6582,689.4121,413.8062z"/>
					<path fill="#BC9A4B" d="M388.167,372.9668c-0.1973,0.0054-0.3945,0.0107-0.5869,0c-27.8867,0-53.3135,15.0029-66.4209,39.2197
						c-3.5303,6.541-1.106,14.7119,5.4453,18.252c2.0244,1.1006,4.2256,1.625,6.3955,1.625c4.7759,0,9.4063-2.5591,11.8516-7.0655
						c8.3838-15.4951,24.7461-25.0991,42.8271-25.0991c0.1353,0,0.2549,0,0.3897,0c17.9096,0,34.2412,9.5982,42.6455,25.0943
						c3.5561,6.5512,11.7426,8.9755,18.2578,5.414c6.541-3.5449,8.9702-11.7217,5.414-18.2568
						C441.2573,387.959,415.8721,372.9668,388.167,372.9668z"/>
				</g>
				<path fill="#EA6157" d="M504.9897,682.29c-99.7334-0.0205-181.2871-77.1201-188.5288-174.9746h377.084
					C686.2666,605.1699,604.6709,682.2695,504.9897,682.29z"/>
			</g>
		</g>
	</g>
</g>
</svg>`,
            sm2: `<svg version="1.1" data-smileid="sm2" id="Layer_1" width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">
<g>
	<path fill="#303C42" d="M17.5,4H17V1.5C17,0.6728516,16.3271484,0,15.5,0h-7C7.6728516,0,7,0.6728516,7,1.5V4H6.5
		C4.0185547,4,2,6.0185547,2,8.5v8c0,2.3102417,1.7561646,4.1970215,4,4.4494629V23.5C6,23.7763672,6.2236328,24,6.5,24h11
		c0.2763672,0,0.5-0.2236328,0.5-0.5v-2.5505371c2.2438354-0.2524414,4-2.1392212,4-4.4494629v-8C22,6.0185547,19.9814453,4,17.5,4z
		"/>
	<path fill="#FDD837" d="M8,1.5C8,1.2246094,8.2246094,1,8.5,1h7C15.7753906,1,16,1.2246094,16,1.5V4H8V1.5z"/>
	<rect x="7" y="21" fill="#FDD837" width="10" height="2"/>
	<path fill="#FDD837" d="M21,16.5c0,1.9296875-1.5703125,3.5-3.5,3.5h-11C4.5703125,20,3,18.4296875,3,16.5v-8
		C3,6.5703125,4.5703125,5,6.5,5h11C19.4296875,5,21,6.5703125,21,8.5V16.5z"/>
	<path opacity="0.2" fill="#FFFFFF" d="M9.8124924,1H8.5C8.2246094,1,8,1.2246094,8,1.5V4h1.5V1.5
		C9.5,1.2246094,9.6403809,1,9.8124924,1z"/>
	<path opacity="0.1" fill="#010101" d="M15.5,1h-1.3125076C14.3596191,1,14.5,1.2246094,14.5,1.5V4H16V1.5
		C16,1.2246094,15.7753906,1,15.5,1z"/>
	<rect x="7" y="21" opacity="0.2" fill="#FFFFFF" width="1.111084" height="2"/>
	<rect x="15.888916" y="21" opacity="0.1" fill="#010101" width="1.111084" height="2"/>
	<path opacity="0.2" fill="#FFFFFF" d="M5,16.5v-8C5,6.5703125,6.2213745,5,7.722229,5H6.5C4.5703125,5,3,6.5703125,3,8.5v8
		C3,18.4296875,4.5703125,20,6.5,20h1.222229C6.2213745,20,5,18.4296875,5,16.5z"/>
	<path opacity="0.1" fill="#010101" d="M17.5,5h-1.222229C17.7786255,5,19,6.5703125,19,8.5v8
		c0,1.9296875-1.2213745,3.5-2.722229,3.5H17.5c1.9296875,0,3.5-1.5703125,3.5-3.5v-8C21,6.5703125,19.4296875,5,17.5,5z"/>
	<path fill="#303C42" d="M14.9609375,14.6650391C14.1855469,15.5263672,13.1337891,16,12,16
		s-2.1855469-0.4736328-2.9609375-1.3349609c-0.1855469-0.2050781-0.5009766-0.2236328-0.7060547-0.0361328
		c-0.2050781,0.1845703-0.2216797,0.5009766-0.0361328,0.7060547C9.25,16.3925781,10.5996094,17,12,17
		s2.75-0.6074219,3.703125-1.6650391c0.1855469-0.2050781,0.1689453-0.5214844-0.0361328-0.7060547
		C15.4619141,14.4423828,15.1464844,14.4609375,14.9609375,14.6650391z"/>
	<circle fill="#303C42" cx="9" cy="11" r="1"/>
	<circle fill="#303C42" cx="15" cy="11" r="1"/>
	<linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="9.5" y1="18.5" x2="15.5" y2="24.5">
		<stop  offset="0" style="stop-color:#010101;stop-opacity:0.1"/>
		<stop  offset="1" style="stop-color:#010101;stop-opacity:0"/>
	</linearGradient>
	<polygon fill="url(#SVGID_1_)" points="17,23 17,21 7,21 9,23 	"/>
	<linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="1.9046832" y1="7.7072372" x2="22.1577549" y2="17.1513996">
		<stop  offset="0" style="stop-color:#FFFFFF;stop-opacity:0.2"/>
		<stop  offset="1" style="stop-color:#FFFFFF;stop-opacity:0"/>
	</linearGradient>
	<path fill="url(#SVGID_2_)" d="M17.5,4H17V1.5C17,0.6728516,16.3271484,0,15.5,0h-7C7.6728516,0,7,0.6728516,7,1.5V4H6.5
		C4.0185547,4,2,6.0185547,2,8.5v8c0,2.3102417,1.7561646,4.1970215,4,4.4494629V23.5C6,23.7763672,6.2236328,24,6.5,24h11
		c0.2763672,0,0.5-0.2236328,0.5-0.5v-2.5505371c2.2438354-0.2524414,4-2.1392212,4-4.4494629v-8C22,6.0185547,19.9814453,4,17.5,4z
		"/>
</g><g>
</g><g>
</g><g>
</g><g>
</g><g>
</g><g>
</g><g>
</g><g>
</g><g>
</g><g>
</g><g>
</g><g>
</g><g>
</g><g>
</g><g>
</g>
</svg>`,
            sm3: `<svg data-smileid="sm3" enable-background="new 0 0 247.266 249.135" height="30px" id="Layer_3" overflow="visible" version="1.1" viewBox="0 0 247.266 249.135" width="30px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><circle cx="129.704" cy="113" fill="#FFE585" r="109"/><path d="M132.272,5.947c-1.025,0-2.049,0.017-3.067,0.045  c54.425,1.551,98.067,46.155,98.067,100.955c0,55.781-45.219,101-101,101c-55.78,0-101-45.219-101-101  c0-8.786,1.124-17.309,3.232-25.436c-3.394,10.536-5.232,21.771-5.232,33.436c0,60.199,48.802,109,109,109  c60.199,0,109-48.801,109-109S192.471,5.947,132.272,5.947z" enable-background="new    " fill="#FF9900" opacity="0.24"/><line enable-background="new    " fill="none" opacity="0.29" stroke="#6E6E96" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" x1="105.57" x2="153.57" y1="245.135" y2="245.135"/><line enable-background="new    " fill="none" opacity="0.17" stroke="#6E6E96" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" x1="171.436" x2="185.436" y1="245.135" y2="245.135"/><line enable-background="new    " fill="none" opacity="0.17" stroke="#6E6E96" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" x1="86.436" x2="75.436" y1="245.135" y2="245.135"/><path d="M29.704,118.5c0-57.162,46.338-103.5,103.5-103.5c55.922,0,101.477,44.353,103.427,99.797  c0.044-1.261,0.073-2.525,0.073-3.797c0-60.198-48.802-109-109-109c-60.199,0-109,48.802-109,109  c0,50.111,33.817,92.318,79.876,105.06C58.447,201.814,29.704,163.518,29.704,118.5z" fill="#FFEFB5"/><path d="M181.364,209.545  c-11.104,5.828-23.408,9.824-36.568,11.54c-54.425,7.097-104.699-27.26-119.048-78.623" fill="none" stroke="#6E6E96" stroke-linecap="round" stroke-width="8"/><path d="M61.633,28.659  c15.223-12.491,34.015-21.012,54.98-23.745c59.693-7.782,114.394,34.3,122.176,93.994c2.26,17.329,0.316,34.237-5.04,49.699" fill="none" stroke="#6E6E96" stroke-linecap="round" stroke-width="8"/><circle cx="111.969" cy="64.439" fill="#6E6E96" r="9"/><circle cx="169.053" cy="88.976" fill="#6E6E96" r="9"/><g><path d="M105.487,148.835   c-6.25-3.108-8.799-10.695-5.69-16.946c3.108-6.251,10.695-8.799,16.946-5.69c3.125,1.553,5.324,4.228,6.354,7.293" fill="none" stroke="#6E6E96" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><path d="M102.598,171.362   c-3.066,1.03-6.526,0.891-9.651-0.663c-6.251-3.108-8.799-10.695-5.691-16.946c3.108-6.252,10.695-8.799,16.946-5.691" fill="none" stroke="#6E6E96" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/></g><g><path d="M72.301,54.679   c-7.115-2.417-14.457-1.419-20.748,2.128c-2.268-6.21-6.859-11.509-13.245-13.678c-11.834-4.021-25.333,4.216-29.21,15.63   c-9.962,29.32,21.758,60.826,21.758,60.826l0.869-1.801l-0.247,2.015c0,0,44.503-5.612,54.464-34.931   C89.819,73.456,84.134,58.7,72.301,54.679z" fill="#FF94B3" stroke="#6E6E96" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><path d="M44.131,54.198c0.813-0.482,1.648-0.91,2.499-1.294   c-2.506-4.086-6.206-7.359-10.862-8.905C39.612,46.293,42.481,49.987,44.131,54.198z M68.554,54.286   c-0.695-0.217-1.391-0.395-2.09-0.547c7.858,4.93,11.481,15.801,8.714,24.613c-8.224,26.181-47.537,32.067-47.537,32.067   l0.178-1.787l-0.731,1.614c0,0-15.284-14.496-20.377-32.499c3.905,21.736,23.295,40.123,23.295,40.123l0.798-1.759l-0.194,1.947   c0,0,42.833-6.415,51.791-34.939C85.887,72.016,80.067,57.902,68.554,54.286z" enable-background="new    " fill="#6E6E96" opacity="0.15"/></g><g><path d="M224.828,162.495   c-4.727-1.604-9.604-0.942-13.784,1.413c-1.506-4.125-4.558-7.646-8.8-9.086c-7.861-2.672-16.83,2.801-19.404,10.385   c-6.619,19.478,14.454,40.409,14.454,40.409l0.577-1.197l-0.164,1.339c0,0,29.564-3.728,36.182-23.206   C236.466,174.969,232.689,165.167,224.828,162.495z" fill="#FF94B3" stroke="#6E6E96" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><path d="M206.114,162.177c0.54-0.322,1.095-0.605,1.659-0.86   c-1.664-2.715-4.123-4.89-7.215-5.916C203.112,156.925,205.017,159.378,206.114,162.177z M222.339,162.234   c-0.462-0.146-0.924-0.263-1.388-0.363c5.22,3.274,7.627,10.497,5.789,16.352c-5.464,17.393-31.582,21.304-31.582,21.304   l0.118-1.188l-0.485,1.073c0,0-10.154-9.631-13.538-21.591c2.595,14.439,15.477,26.654,15.477,26.654l0.529-1.167l-0.129,1.293   c0,0,28.456-4.263,34.406-23.212C233.854,174.012,229.988,164.636,222.339,162.234z" enable-background="new    " fill="#6E6E96" opacity="0.15"/></g></svg>`,
            sm4: `<svg data-smileid="sm4" enable-background="new 0 0 226 249.135" width="30px" height="30px" id="Layer_2" overflow="visible" version="1.1" viewBox="0 0 226 249.135" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><circle cx="113" cy="113" fill="#FFE585" r="109"/><line enable-background="new    " fill="none" opacity="0.29" stroke="#6E6E96" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" x1="88.866" x2="136.866" y1="245.135" y2="245.135"/><line enable-background="new    " fill="none" opacity="0.17" stroke="#6E6E96" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" x1="154.732" x2="168.732" y1="245.135" y2="245.135"/><line enable-background="new    " fill="none" opacity="0.17" stroke="#6E6E96" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" x1="69.732" x2="58.732" y1="245.135" y2="245.135"/><circle cx="68.732" cy="93" fill="#6E6E96" r="9"/><path d="M115.568,5.947c-1.026,0-2.049,0.017-3.069,0.045  c54.425,1.551,98.069,46.155,98.069,100.955c0,55.781-45.219,101-101,101c-55.781,0-101-45.219-101-101  c0-8.786,1.124-17.309,3.232-25.436c-3.393,10.536-5.232,21.771-5.232,33.436c0,60.199,48.801,109,109,109s109-48.801,109-109  S175.768,5.947,115.568,5.947z" enable-background="new    " fill="#FF9900" opacity="0.24"/><circle cx="156.398" cy="93" fill="#6E6E96" r="9"/><ellipse cx="67.732" cy="140.894" enable-background="new    " fill="#FF0000" opacity="0.18" rx="17.372" ry="8.106"/><ellipse cx="154.88" cy="140.894" enable-background="new    " fill="#FF0000" opacity="0.18" rx="17.371" ry="8.106"/><path d="M13,118.5C13,61.338,59.338,15,116.5,15c55.922,0,101.477,44.353,103.427,99.797  c0.044-1.261,0.073-2.525,0.073-3.797C220,50.802,171.199,2,111,2S2,50.802,2,111c0,50.111,33.818,92.318,79.876,105.06  C41.743,201.814,13,163.518,13,118.5z" fill="#FFEFB5"/><circle cx="113" cy="113" fill="none" r="109" stroke="#6E6E96" stroke-width="8"/></svg>`
        }
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
            <div id="leftMenu" class="drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
                <header class="drawer-header">
                   <img src="img/user.jpg" class="avatar">
                   <div id="nameChannel"></div>
                </header>
                <div id="nameChannel"></div>
                <nav class="navigation mdl-navigation mdl-color--blue-grey-800">
                   <div class="avatar-dropdown">
                       <button class="close" id="returnGeneralChannel">general</button>
                   </div>
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
                                <label class="mdl-textfield__label" for="formSendMessage"></label>
                            </div>
                        </form>
                    </div>
                    <div class="mdl-cell mdl-cell--2-col">
                        <button id="btnsmile" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab">
                            <i class="material-icons">insert_emoticon</i>
                        </button>
                        <div id="get-smile" class="get-smile">
                            ${this.smile.sm1}
                            ${this.smile.sm2}
                            ${this.smile.sm3}
                            ${this.smile.sm4}
                            </div>
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
            this.btnGeneralChannel = $('#returnGeneralChannel');
            this.nameList = $('#namelist');
            this.nameChannel = $('#nameChannel');
            this.smileDiv = $('#get-smile');
            this.leftMenu = $('#leftMenu');

            // всплытия и закрытия окна
            $('#btnsmile').click((evt) => this.smileDiv.show("fast"));
            $(document).mousedown((evt) => this.smileDiv.fadeOut("slow"));
            // всплытия и закрытия окна
            $(this.listMessages).on('DOMNodeInserted', this.scrollListMessage.bind(this));

            // Тач события для отображения бокового меню
            $(this.listMessages).on('touchmove', (e) => this.positionEndTouch = e.touches[0].clientX);
            $(this.listMessages).on('touchstart', (e) => this.positionStartTouch = e.touches[0].clientX);
            $(this.listMessages).on('touchend', (e) => {
                if (this.positionStartTouch < this.positionEndTouch) {
                    if (this.leftMenu.attr('aria-hidden') && !this.leftMenu.hasClass('is-visible')) {
                        $('main').next().addClass('is-visible');
                        this.leftMenu.attr('aria-hidden', false).addClass('is-visible');
                    }
                }
                this.positionStartTouch = null;
                this.positionEndTouch = null;
            });

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

            if (message.mess in this.smile) {
                $(spanTextMessage).append(this.smile[message.mess]);
            } else {
                spanTextMessage.textContent = message.mess;
            }
            spanTextMessage.className = 'mdl-list__item-text-body';
            spanMessage.appendChild(spanTextMessage);

            $(liMessage).hide().show(500);
        }
    }

    renderOldMessages(messages, user) {
        for (let m = messages.length - 1; m >= 0; m--) {
            let a = '',
                mess;
            if (messages[m].mess in this.smile) {
                mess = this.smile[messages[m].mess];
            } else {
                mess = messages[m].mess;
            }
            if (messages[m].name === user) {
                a = `<li class="mdl-list__item mdl-list__item--three-line liAuthor">
                        <span class="mdl-list__item-primary-content">
                            <i class="material-icons mdl-list__item-avatar avatarAuthor">person</i>
                            <span>${messages[m].name}</span>
                            <span class="mdl-list__item-text-body">${mess}</span>
                        </span>
                      </li>`;
            } else {
                a = `<li class="mdl-list__item mdl-list__item--three-line">
                        <span class="mdl-list__item-primary-content">
                            <i class="material-icons mdl-list__item-avatar">person</i>
                            <span>${messages[m].name}</span>
                            <span class="mdl-list__item-text-body">${mess}</span>
                        </span>
                      </li>`;

            }

            $(this.listMessages).prepend(a).children('li:first').hide().show(500);
        }
    }


    stopPlayNewMessage() {
        if ('vibrate' in window.navigator) window.navigator.vibrate(500);
        let a =  new Audio('./audio/newMessage.mp3');
        a.onended = () => {
            a.pause();
            a.currentTime = 0;
        };
        a.play();
    }

    scrollListMessage() {
        let viewBox = $(this.listMessages).parent().height();
        this.heightMessage = $(this.listMessages).find('li:first').height();
        this.heightUl = $(this.listMessages).height();
        this.positionUl = $(this.listMessages).position().top;
        if (this.heightUl + this.positionUl - viewBox < this.heightMessage * 1.5) {
            this.listMessages.scrollIntoView(false);
        }
    }

}
