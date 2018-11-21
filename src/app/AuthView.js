import {PubSubService} from "./PubSubService";

export class AuthView {
    constructor(root) {
        this.root = root;
        this.element = null;
    }

    render() {
        if (!this.element) {
            this.root.innerHTML = `
				<div id="auth" class="auth">
				
						<div id="auth_wrapper" class="auth_wrapper">
												<h2 class="authorisation">Authorisation</h2>
                        <a id="login-link" class="login-link come" href="#">Вход</a>
                        <a id="login-reg" class="login-link check" href="#">Регистрация</a>
                    </div>                                     
                                        <section id="modal-login" class="modal modal-login">
                                        
                                            <h2 class="modal-textauth">Введите логин и пароль</h2>
                                        
                                            <p id="errorvalue">Введите пожалуйста свой логин и пароль.</p>
                                            <form id="formlog" class="login-form" method="post">
                                                <p>
                                                    <label for="user-login" hidden>Логин</label>
                                                    <input class="login-icon-user" id="user-login" type="text" name="login" placeholder="Логин" value="">
                                                </p>
                                                <p>
                                                    <label for="user-password" hidden>Пароль</label>
                                                    <input class="login-icon-password" id="user-password" type="password" name="password" placeholder="Пароль" value="">
                                                </p>
                                                <p class="login-help">
                                                    <label for="login-checkbox" class="login-checkbox">
                                                        <input type="checkbox" id="login-checkbox" name="remember" hidden>
                                                        <span class="checkbox-indicator"></span>
                                                        Запомните меня
                                                    </label>
                                                    <a id="restore" class="restore" href="#">Регистрация</a>
                                                </p>
                                                <button class="button" id="signin" type="submit">Войти</button>
                                            </form>
                                        
                                            <button id="modal-close" class="modal-close" type="button">закрыть</button>
                                        </section>
                                        
                                        <section id="checkin" class="modal checkin">
                                        
                                            <h2 class="modal-textcheckin">Регистрация</h2>
                                        
                                            <p id="errorvaluecheckin">Пройдите регистрацию.</p>
                                            <form id="form-checkin" class="checkin-form" method="post">
                                                <p>
                                                    <label for="user-login" hidden>Логин</label>
                                                    <input class="login-user" id="user-logincheckin" type="text" name="logincheckin" placeholder="Логин" value="">
                                                </p>
                                                <p>
                                                    <label for="user-password" hidden>Пароль</label>
                                                    <input class="login-password" id="user-passwordcheckin" type="password" name="passwordcheckin" placeholder="Пароль" value="">
                                                </p>
                                                <p>
                                                    <label for="user-password" hidden>Пароль</label>
                                                    <input class="login-passwordcheck" id="user-passwordcheckinget" type="password" name="passwordcheckincheck" placeholder="Проверка пароля" value="">
                                                </p>
                                                <button class="button" type="submit">Зарегестрироваться</button>
                                            </form>
                                        
                                            <button id="modal-closecheckin" class="modal-closecheckin" type="button">Закрыть</button>
                                        </section>                
				</div>
        `;
        }
    }

    btnAnimate() {
        this.btn1 = $('#login-link');
        this.btn2 = $('#login-reg');
        this.btn1.mouseenter((evt) => {
            this.btn1 = $('#login-link');
            this.btn1.animate({
                width: '80%',
                left: '-10%',
                paddingTop: '5%',
                paddingBottom: '5%',
                top: '-2.5%',
            }, 500)
        });
        this.btn1.mouseleave((evt) => {
            this.btn1 = $('#login-link');
            this.btn1.animate({
                width: '70%',
                left: '-5%',
                paddingTop: '2.5%',
                paddingBottom: '2.5%',
                top: '0',
            }, 500)
        });
        this.btn2.mouseenter((evt) => {
            this.btn2 = $('#login-reg');
            this.btn2.animate({
                width: '80%',
                left: '-10%',
                paddingTop: '5%',
                paddingBottom: '5%',
                top: '37.5%',
            }, 500)
        });
        this.btn2.mouseleave((evt) => {
            this.btn2 = $('#login-reg');
            this.btn2.animate({
                height: '10%',
                width: '70%',
                left: '-5%',
                paddingTop: '2.5%',
                paddingBottom: '2.5%',
                top: '40%',
            }, 500)
        });
    }

// АВТОРТЗАЦИЯ(вход зарегестрированных пользователей)------------------------------------------------------------
    authFormAscent(evt) {        //всплыте окна авторизации
        let popupLogin = document.getElementById("modal-login"),
            loginLog = document.getElementById("user-login"),
            authWrapper = document.getElementById("auth_wrapper");
        evt.preventDefault();
        authWrapper.classList.add("none");
        popupLogin.classList.add("modal-show");
        loginLog.focus();
    }

    authFormSubmit(evt, model, view) {     //Проверка авторизации пользователя из базы имён сервера
        let popupLogin = document.getElementById("modal-login"),
            loginLog = document.getElementById("user-login"),
            passwordLog = document.getElementById("user-password");
        evt.preventDefault();
        //получить чтонить
        let loginName = loginLog.value;
        let startPass = passwordLog.value;
        model.getNameAuth(loginName);
        model.getAuthorizationStorage(loginName, startPass, popupLogin, view);
    }

    authSuccess(name, popupLogin) {         //при успешной проверке формы дальнейшие действия
        popupLogin.classList.remove("modal-back");
        popupLogin.classList.remove("modal-show");
        popupLogin.classList.remove("modal-error");
        new PubSubService().pub('onAuthUser', name);
        //localStorage['authName'] = name;
        // -- запись в локалсторедж именя
        //location.hash = `dialog`;
    }

    authError(popupLogin) {     //при не успешной проверке формы выброс ошибки
        navigator.vibrate(500);
        let errorvalue = document.getElementById('errorvalue');
        errorvalue.style.color = 'yellow';
        errorvalue.innerText = `Введите корректно логин и пароль`;
        popupLogin.classList.remove("modal-error");
        setTimeout(function () {
            popupLogin.classList.add("modal-error");
        }, 5);
    }

    authWindowCloseClick(evt) {      // закрытие окна авторизации по клику
        let popupLogin = document.getElementById("modal-login"),
            authWrapper = document.getElementById("auth_wrapper");
        evt.preventDefault();
        popupLogin.classList.add("modal-back");
        this.authCloseRemoveClass(popupLogin, authWrapper);
    }

    authWindowCloseEscape(evt) {     //закрыте окна авторизации по нажатию клавишы esc
        let popupLogin = document.getElementById("modal-login"),
            authWrapper = document.getElementById("auth_wrapper");
        if (evt.keyCode === 27) {
            if (popupLogin.classList.contains("modal-show")) {
                popupLogin.classList.add("modal-back");
                this.authCloseRemoveClass(popupLogin, authWrapper);
            }
        }
    }

    authCloseRemoveClass(popupLogin, authWrapper) {     //удаление блока ненужных классов после закрытия модального окна АВТОРИЗАЦИИ
        setTimeout(function () {
            popupLogin.classList.remove("modal-back");
            popupLogin.classList.remove("modal-show");
            popupLogin.classList.remove("modal-error");
            try {
                authWrapper.classList.remove("none");
            } catch {
            }
        }, 300);

    }

// АВТОРТЗАЦИЯ(вход зарегестрированных пользователей)------------------------------------------------------------
// РЕГИСТРАЦИЯ------------------------------------------------------------
    checkinFormAscent(evt) {        //всплыте окна регистрации
        let popupLogin = document.getElementById("modal-login"),
            popupCheckin = document.getElementById("checkin"),
            loginCheckin = document.getElementById("user-logincheckin"),
            authWrapper = document.getElementById("auth_wrapper");
        popupLogin.classList.add("modal-back");
        this.authCloseRemoveClass(popupLogin);
        evt.preventDefault();
        authWrapper.classList.add("none");
        popupCheckin.classList.add("modal-showcheckin");
        loginCheckin.focus();
    }

    checkinFormSubmit(evt, model, view) {     //Проверка формы до отправки на сервер, отправка данных на сервер
        let popupCheckin = document.getElementById("checkin"),
            linkLog = document.getElementById("login-link"),
            loginCheckin = document.getElementById("user-logincheckin"),
            passwordCheckin = document.getElementById("user-passwordcheckin"),
            passwordCheckinCheck = document.getElementById("user-passwordcheckinget");
        evt.preventDefault();
        let loginName = loginCheckin.value;
        let LoginPassword = passwordCheckin.value;
        let LoginPasswordCheckin = passwordCheckinCheck.value;
        model.getNameAuth(loginCheckin.value);
        model.checkAuthorizationStorage(loginName, LoginPassword, LoginPasswordCheckin, popupCheckin, view);

    }

    checkinSuccess(loginName, popupCheckin) {     //при успешной проверке формы дальнейшие действия
        popupCheckin.classList.remove("modal-backcheckin");
        popupCheckin.classList.remove("modal-showcheckin");
        popupCheckin.classList.remove("modal-errorcheckin");
        new PubSubService().pub('onAuthUser', loginName);
        //localStorage['authName'] = loginName;
        // -- запись в локалсторедж именя
        // location.hash = `dialog`;
    }

    checkinError(popupCheckin) {       //при не успешной проверке формы выброс ошибки
        navigator.vibrate(500);
        let errorvaluecheckin = document.getElementById('errorvaluecheckin');
        errorvaluecheckin.style.color = 'yellow';
        errorvaluecheckin.innerText = `Заполните корректно данные`;
        popupCheckin.classList.remove("modal-errorcheckin");
        setTimeout(function () {
            popupCheckin.classList.add("modal-errorcheckin");
        }, 5);
    }

    checkinNameError(popupCheckin) {       //при не успешной проверке формы выброс ошибки
        window.navigator.vibrate(500);
        let errorvaluecheckin = document.getElementById('errorvaluecheckin');
        errorvaluecheckin.style.color = 'yellow';
        errorvaluecheckin.innerText = `Такое имя уже занято введите другое`;
        popupCheckin.classList.remove("modal-errorcheckin");
        setTimeout(function () {
            popupCheckin.classList.add("modal-errorcheckin");
        }, 5);
    }

    checkinWindowCloseClick(evt) {      // закрытие окна регистрации по клику
        let popupCheckin = document.getElementById("checkin"),
            authWrapper = document.getElementById("auth_wrapper");
        evt.preventDefault();
        popupCheckin.classList.add("modal-backcheckin");
        this.checkinCloseRemoveClass(popupCheckin, authWrapper);
    }

    checkinWindowCloseEscape(evt) {     //закрыте окна регистрации по нажатию клавишы esc
        let popupCheckin = document.getElementById("checkin"),
            authWrapper = document.getElementById("auth_wrapper");
        if (evt.keyCode === 27) {
            if (popupCheckin.classList.contains("modal-showcheckin")) {
                popupCheckin.classList.add("modal-backcheckin");
                this.checkinCloseRemoveClass(popupCheckin, authWrapper);
            }
        }
    }

    checkinCloseRemoveClass(popupCheckin, authWrapper) {     //удаление блока ненужных классов после закрытия модального окна РЕГИСТРАЦИИ
        setTimeout(function () {
            popupCheckin.classList.remove("modal-backcheckin");
            popupCheckin.classList.remove("modal-showcheckin");
            popupCheckin.classList.remove("modal-errorcheckin");
            authWrapper.classList.remove("none");
        }, 200);
    }

// РЕГИСТРАЦИЯ------------------------------------------------------------
}

