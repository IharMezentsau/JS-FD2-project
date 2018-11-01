export class AuthModel {
    constructor() {
        this.ajaxHandlerScript = "http://fe.it-academy.by/AjaxStringStorage2.php";
        this.stringName = 'CHUPILIN_SITE_STORAGE';
        this.messages = {};
    }

    // ПОЛУЧЕНИЕ ДАННЫХ НА СЕРВЕР----------------------------------------------------------------------
    getAuthorizationStorage(name, pass, popupLogin) {
        $.ajax({
                url: this.ajaxHandlerScript,
                type: 'POST', dataType: 'json',
                data: {f: 'READ', n: this.stringName},
                cache: false,
                success: (callresult) => this.readReady(callresult, name, pass, popupLogin),
                error: this.errorHandler
            }
        );
    }

    readReady(callresult, name, pass, popupLogin) { // сообщения получены - показывает
        if (callresult.error !== undefined)
            alert(callresult.error);
        else {
            if (callresult.result !== "") { // либо строка пустая - сообщений нет
                // либо в строке - JSON-представление массива сообщений
                this.messages = JSON.parse(callresult.result);
            }
            try {
                if (this.messages[name].pass !== pass) {
                    let errorvalue = document.getElementById('errorvalue');
                    errorvalue.style.color = 'red';
                    errorvalue.innerText = `Введите корректно логин и пароль`;
                    popupLogin.classList.remove("modal-error");
                    setTimeout(function () {
                        popupLogin.classList.add("modal-error");
                    }, 0);
                } else {
                    popupLogin.classList.remove("modal-back");
                    popupLogin.classList.remove("modal-show");
                    popupLogin.classList.remove("modal-error");
                    let span = document.createElement("span");
                    span.innerHTML += `Добро пожаловать <span style="font-size: 20px; font-weight: bold; color: #00BCD4">${name}</span>`;
                    let divwrapp = document.querySelector('.wrapp');
                    divwrapp.appendChild(span);
                    let a = document.createElement('a');
                    divwrapp.appendChild(a);
                    a.innerHTML += `Выйти`;
                    a.setAttribute('class', 'close');
                    a.setAttribute('href', 'index.html');
                    let linkLog = document.querySelector(".login-link");
                    divwrapp.removeChild(linkLog);
                    let navNav = document.querySelector('.niga');
                    navNav.innerHTML += `<a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">person</i>${name} Online</a>`;
                    // document.body.querySelector('.mdl-grid').style.display = 'none';
                }
            }
            catch {
                if (this.messages[name] === undefined || !name || !pass) {
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
        console.log(statusStr + ' ' + errorStr);
    }
}