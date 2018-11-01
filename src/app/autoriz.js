/*class AuthorizationStorage {
    constructor() {
        this.ajaxHandlerScript = "http://fe.it-academy.by/AjaxStringStorage2.php";
        this.stringName = 'CHUPILIN_DRINK_STORAGE';
        this.messages = {};
    }

    // ПОЛУЧЕНИЕ ДАННЫХ НА СЕРВЕР----------------------------------------------------------------------
    getAuthorizationStorage(name) {
        $.ajax({
                url: this.ajaxHandlerScript,
                type: 'POST', dataType: 'json',
                data: {f: 'READ', n: this.stringName},
                cache: false,
                success: (callresult) => this.readReady(callresult, name),
                error: this.errorHandler
            }
        );
    }

    readReady(callresult, name) { // сообщения получены - показывает
        if (callresult.error !== undefined)
            alert(callresult.error);
        else {
            if (callresult.result !== "") { // либо строка пустая - сообщений нет
                // либо в строке - JSON-представление массива сообщений
                this.messages = JSON.parse(callresult.result);
            }
            let nm = loginLog.value;
            let ps = passwordLog.value;
            try {
                if (this.messages[name].pass !== passwordLog.value) {
                    let errorvalue = document.getElementById('errorvalue');
                    errorvalue.style.color = 'red';
                    errorvalue.innerText = `Введите корректно логин и пароль`;
                    popupLogin.classList.remove("modal-error");
                    setTimeout(function () {
                        popupLogin.classList.add("modal-error");
                    }, 0);
                } else {
                    loginName = loginLog.value;
                    popupLogin.classList.remove("modal-back");
                    popupLogin.classList.remove("modal-show");
                    popupLogin.classList.remove("modal-error");
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
                    let navNav = document.querySelector('.mdl-navigation__link');
                    navNav.innerHTML = `<i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">person</i>${loginName} online`;
                }
            }
            catch {
                if (this.messages[name] === undefined || !nm || !ps) {
                    let errorvalue = document.getElementById('errorvalue');
                    errorvalue.style.color = 'red';
                    errorvalue.innerText = `Введите корректно логин и пароль`;
                    popupLogin.classList.remove("modal-error");
                    setTimeout(function () {
                        popupLogin.classList.add("modal-error");
                    }, 0);
                }
            }
        }
    }

    // ПОЛУЧЕНИЕ ДАННЫХ НА СЕРВЕР----------------------------------------------------------------------
    // ЗАПИСЬ ДАННЫХ НА СЕРВЕР-----------------------------------------------------

    sendAuthorization(name, pass) {
        this.updatePassword = Math.random();
        $.ajax(
            {
                url: this.ajaxHandlerScript,
                type: 'POST', dataType: 'json',
                data: {
                    f: 'LOCKGET', n: this.stringName,
                    p: this.updatePassword
                },
                cache: false,
                success: (a) => this.lockGetReady(a, (name, pass) => {
                    this.messages[name] = {pass};
                }, name, pass),
                error: this.errorHandler
            }
        );
    }

    lockGetReady(callresult, func, name, pass) {
        if (callresult.error !== undefined)
            alert(callresult.error);
        else {
            if (callresult.result !== "") {
                this.messages = JSON.parse(callresult.result);
            }
            func(name, pass);
            $.ajax({
                    url: this.ajaxHandlerScript,
                    type: 'POST', dataType: 'json',
                    data: {
                        f: 'UPDATE', n: this.stringName,
                        v: JSON.stringify(this.messages), p: this.updatePassword
                    },
                    cache: false,
                    success: this.updateReady,
                    error: this.errorHandler
                }
            );
        }
    }

    updateReady(callresult) {
        if (callresult.error !== undefined)
            alert(callresult.error);
    }

    // ЗАПИСЬ ДАННЫХ НА СЕРВЕР----------------------------------------------------------------------------

    errorHandler(jqXHR, statusStr, errorStr) {
        alert(statusStr + ' ' + errorStr);
    }
}

// ПЕРВОНАЧАЛЬНЫЙ ВХОД С ПРОВЕРКОЙ ЧЕРЕЗ AJAX----------------------------------------------------
let loginName;

let linkLog = document.querySelector(".login-link");
let popupLogin = document.querySelector(".modal-login");
let closeLog = document.querySelector(".modal-close");
let loginLog = popupLogin.querySelector("[name=login]");
let passwordLog = popupLogin.querySelector("[name=password]");
let formLog = popupLogin.querySelector("form");
let authorizationStorage = new AuthorizationStorage();

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
    let startValue = loginLog.value;
    authorizationStorage.getAuthorizationStorage(startValue);
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
        authorizationStorage.sendAuthorization(loginName, LoginPassword);
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
        let navNav = document.querySelector('.mdl-navigation__link');
        navNav.innerHTML = `<i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">person</i>${loginName} online`;
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
*/