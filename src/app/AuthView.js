export class AuthView {
    constructor() {
        this.element = null;
    }

    render() {
        if(!this.element){
            document.body.querySelector('.wrapp').innerHTML += `<a class="login-link" href="#">Вход</a>
                                                                            
                                        <section class="modal modal-login">
                                        
                                            <h2>Введите логин и пароль для входа</h2>
                                        
                                            <p id="errorvalue">Введите пожалуйста свой логин и пароль.</p>
                                            <form class="login-form" method="post">
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
                                                    <a class="restore" href="#">Регистрация</a>
                                                </p>
                                                <button class="button" id="signin" type="submit">Войти</button>
                                            </form>
                                        
                                            <button class="modal-close" type="button">закрыть</button>
                                        </section>
                                        
                                        <section class="modal checkin">
                                        
                                            <h2>Регистрация</h2>
                                        
                                            <p id="errorvaluecheckin">Пройдите регистрацию.</p>
                                            <form class="checkin-form" method="post">
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
                                        
                                            <button class="modal-closecheckin" type="button">Закрыть</button>
                                        </section>`
        }
    }

    events(model) {
        // ПЕРВОНАЧАЛЬНЫЙ ВХОД С ПРОВЕРКОЙ ЧЕРЕЗ AJAX----------------------------------------------------
        let loginName;

        let linkLog = document.querySelector(".login-link");
        let popupLogin = document.querySelector(".modal-login");

        let closeLog = document.querySelector(".modal-close");
        let loginLog = popupLogin.querySelector("[name=login]");
        let passwordLog = popupLogin.querySelector("[name=password]");
        let formLog = popupLogin.querySelector("form");

        linkLog.addEventListener("click", function (evt) {
            evt.preventDefault();
            popupLogin.classList.add("modal-show");
            loginLog.focus();
        });

        closeLog.addEventListener("click", function (evt) {
            evt.preventDefault();
            popupLogin.classList.add("modal-back");
            setTimeout(function () {
                popupLogin.classList.remove("modal-back");
                popupLogin.classList.remove("modal-show");
                popupLogin.classList.remove("modal-error");
            }, 900);
        });

        formLog.addEventListener("submit", function (evt) {
            evt.preventDefault();
            //получить чтонить
            loginName = loginLog.value;
            let startPass = passwordLog.value;
            model.getAuthorizationStorage(loginName, startPass, popupLogin);
        });

        window.addEventListener("keydown", function (evt) {
            if (evt.keyCode === 27) {
                if (popupLogin.classList.contains("modal-show")) {
                    popupLogin.classList.add("modal-back");
                    setTimeout(function () {
                        popupLogin.classList.remove("modal-back");
                        popupLogin.classList.remove("modal-show");
                        popupLogin.classList.remove("modal-error");
                    }, 900);
                }
            }
        });
// ПЕРВОНАЧАЛЬНЫЙ ВХОД С ПРОВЕРКОЙ ЧЕРЕЗ AJAX-----------------------------
// РЕГИСТРАЦИЯ------------------------------------------------------------

        let restoreLog = popupLogin.querySelector(".restore");
        let popupCheckin = document.querySelector(".checkin");

        let closeCheckin = document.querySelector(".modal-closecheckin");
        let loginCheckin = popupCheckin.querySelector("[name=logincheckin]");
        let passwordCheckin = popupCheckin.querySelector("[name=passwordcheckin]");
        let passwordCheckinCheck = popupCheckin.querySelector("[name=passwordcheckincheck]");
        let formCheckin = popupCheckin.querySelector("form");


        restoreLog.addEventListener('click', function (evt) {
            popupLogin.classList.add("modal-back");
            setTimeout(function () {
                popupLogin.classList.remove("modal-back");
                popupLogin.classList.remove("modal-show");
                popupLogin.classList.remove("modal-error");
            }, 900);
            evt.preventDefault();
            popupCheckin.classList.add("modal-showcheckin");
            loginLog.focus();
        });

        closeCheckin.addEventListener("click", function (evt) {
            evt.preventDefault();
            popupCheckin.classList.add("modal-backcheckin");
            setTimeout(function () {
                popupCheckin.classList.remove("modal-backcheckin");
                popupCheckin.classList.remove("modal-showcheckin");
                popupCheckin.classList.remove("modal-errorcheckin");
            }, 900);
        });

        formCheckin.addEventListener("submit", function (evt) {
            if (!loginCheckin.value || !passwordCheckin.value || !passwordCheckinCheck.value || passwordCheckin.value !== passwordCheckinCheck.value) {
                let errorvaluecheckin = document.getElementById('errorvaluecheckin');
                errorvaluecheckin.style.color = 'red';
                errorvaluecheckin.innerText = `Заполните корректно данные`;
                evt.preventDefault();
                popupCheckin.classList.remove("modal-errorcheckin");
                setTimeout(function () {
                    popupCheckin.classList.add("modal-errorcheckin");
                }, 0);
            } else {
                loginName = loginCheckin.value;
                let LoginPassword = passwordCheckin.value;
                // запись на сервер-------------------------------
                model.sendAuthorization(loginName, LoginPassword);
                // конец записи на сервер-------------------------------------------------------------------
                evt.preventDefault();
                popupCheckin.classList.remove("modal-backcheckin");
                popupCheckin.classList.remove("modal-showcheckin");
                popupCheckin.classList.remove("modal-errorcheckin");
                let span = document.createElement("span");
                span.innerHTML += `Добро пожаловать <span style="font-size: 20px; font-weight: bold; color: #00BCD4">${loginName}</span>`;
                let divwrapp = document.querySelector('.wrapp');
                divwrapp.appendChild(span);
                let a = document.createElement('a');
                divwrapp.appendChild(a);
                a.innerHTML += `Выйти`;
                a.setAttribute('class', 'close');
                a.setAttribute('href', 'index.html');
                divwrapp.removeChild(linkLog);
                let navNav = document.querySelector('.niga');
                navNav.innerHTML += `<a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">person</i>${name} Online</a>`;
                // document.body.querySelector('.mdl-grid').style.display = 'none';
            }
        });

        window.addEventListener("keydown", function (evt) {
            if (evt.keyCode === 27) {
                if (popupCheckin.classList.contains("modal-showcheckin")) {
                    popupCheckin.classList.add("modal-backcheckin");
                    setTimeout(function () {
                        popupCheckin.classList.remove("modal-backcheckin");
                        popupCheckin.classList.remove("modal-showcheckin");
                        popupCheckin.classList.remove("modal-errorcheckin");
                    }, 900);
                }
            }
        });
// РЕГИСТРАЦИЯ------------------------------------------------------------
    }
}