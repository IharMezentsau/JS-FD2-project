export class AuthView {
    constructor(root) {
        this.root = root;
        this.element = null;
        this.divAuth = null;
    }

    render() {
        if(!this.element){
            this.root.innerHTML = `
				<div id="auth" class="auth">
				<h2 class="authorisation">Authorisation</h2>
				    <div id="auth_wrapper" class="auth_wrapper">
                        <a id="login-link" class="login-link come" href="#">Вход</a>
                        <a id="login-reg" class="login-link check" href="#">Регистрация</a>
                    </div>                                     
                                        <section id="modal-login" class="modal modal-login">
                                        
                                            <h2>Введите логин и пароль для входа</h2>
                                        
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
                                        
                                            <h2>Регистрация</h2>
                                        
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
        // let span = document.createElement("span");
        // span.innerHTML += `Добро пожаловать <span style="font-size: 20px; font-weight: bold; color: #00BCD4">${name}</span>`;
        // this.divAuth = document.getElementById('authorisation');
        // this.divAuth.appendChild(span);
        // let a = document.createElement('a');
        // this.divAuth.appendChild(a);
        // a.innerHTML += `Выйти`;
        // a.setAttribute('class', 'close');
        // a.setAttribute('href', 'index.html');
        // let linkLog = document.getElementById("login-link");
        // this.divAuth.removeChild(linkLog);
        // -- запись в локалсторедж именя
        new PubSubService().pub('onAuthUser', name);
        //localStorage['authName'] = name;
        // -- запись в локалсторедж именя
        //location.hash = `dialog`;
    }

    authError(popupLogin) {     //при не успешной проверке формы выброс ошибки
        let errorvalue = document.getElementById('errorvalue');
        errorvalue.style.color = 'red';
        errorvalue.innerText = `Введите корректно логин и пароль`;
        popupLogin.classList.remove("modal-error");
        setTimeout(function () {
            popupLogin.classList.add("modal-error");
        }, 0);
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
            authWrapper.classList.remove("none");
        }, 100);
        setTimeout(function () {
            popupLogin.classList.remove("modal-back");
            popupLogin.classList.remove("modal-show");
            popupLogin.classList.remove("modal-error");
        }, 900);
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

    checkinFormSubmit(evt, model) {     //Проверка формы до отправки на сервер, отправка данных на сервер
        let popupCheckin = document.getElementById("checkin"),
            linkLog = document.getElementById("login-link"),
            loginCheckin = document.getElementById("user-logincheckin"),
            passwordCheckin = document.getElementById("user-passwordcheckin"),
            passwordCheckinCheck = document.getElementById("user-passwordcheckinget");
        model.getNameAuth(loginCheckin.value);
        if (!loginCheckin.value || !passwordCheckin.value || !passwordCheckinCheck.value || passwordCheckin.value !== passwordCheckinCheck.value) {
            this.checkinError(evt, popupCheckin);
        } else {
            let loginName = loginCheckin.value;
            let LoginPassword = passwordCheckin.value;
            // запись на сервер-------------------------------
            model.sendAuthorization(loginName, LoginPassword);
            // конец записи на сервер-------------------------------------------------------------------
            this.checkinSuccess(evt, popupCheckin, loginName, linkLog);
        }
    }

    checkinSuccess(evt, popupCheckin, loginName, linkLog) {     //при успешной проверке формы дальнейшие действия
        evt.preventDefault();
        popupCheckin.classList.remove("modal-backcheckin");
        popupCheckin.classList.remove("modal-showcheckin");
        popupCheckin.classList.remove("modal-errorcheckin");
        // let span = document.createElement("span");
        // span.innerHTML += `Добро пожаловать <span style="font-size: 20px; font-weight: bold; color: #00BCD4">${loginName}</span>`;
        // this.divAuth = document.getElementById('authorisation');
        // this.divAuth.appendChild(span);
        // let a = document.createElement('a');
        // this.divAuth.appendChild(a);
        // a.innerHTML += `Выйти`;
        // a.setAttribute('class', 'close');
        // a.setAttribute('href', 'index.html');
        // this.divAuth.removeChild(linkLog);
        // -- запись в локалсторедж именя
        new PubSubService().pub('onAuthUser', loginName);
        //localStorage['authName'] = loginName;
        // -- запись в локалсторедж именя
        //location.hash = `dialog`;
    }

    checkinError(evt, popupCheckin) {       //при не успешной проверке формы выброс ошибки
        let errorvaluecheckin = document.getElementById('errorvaluecheckin');
        errorvaluecheckin.style.color = 'red';
        errorvaluecheckin.innerText = `Заполните корректно данные`;
        evt.preventDefault();
        popupCheckin.classList.remove("modal-errorcheckin");
        setTimeout(function () {
            popupCheckin.classList.add("modal-errorcheckin");
        }, 0);
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
            authWrapper.classList.remove("none");
        }, 100);
        setTimeout(function () {
            popupCheckin.classList.remove("modal-backcheckin");
            popupCheckin.classList.remove("modal-showcheckin");
            popupCheckin.classList.remove("modal-errorcheckin");
        }, 900);
    }
// РЕГИСТРАЦИЯ------------------------------------------------------------
}