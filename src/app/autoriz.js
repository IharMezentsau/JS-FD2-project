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
    if (!loginLog.value||!passwordLog.value||localStorage[loginLog.value] === undefined||localStorage[loginLog.value]!==passwordLog.value) {
        evt.preventDefault();
        popupLogin.classList.remove("modal-error");
        setTimeout(function () {
            popupLogin.classList.add("modal-error");
        }, 0);
    } else {
        loginName = loginLog.value;
        evt.preventDefault();
        popupLogin.classList.remove("modal-back");
        popupLogin.classList.remove("modal-show");
        popupLogin.classList.remove("modal-error");
        let span = document.createElement("span");
        span.innerHTML = `Добро пожаловать ${loginName}`;
        document.body.insertBefore(span, linkLog);
        let a = document.createElement('a');
        document.body.replaceChild(a, linkLog);
        a.innerHTML = `Выйти`;
        a.setAttribute('class', 'close');
        a.setAttribute('href', 'index.html');
    }
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
    if (!loginCheckin.value||!passwordCheckin.value||!passwordCheckinCheck.value||passwordCheckin.value!==passwordCheckinCheck.value) {
        evt.preventDefault();
        popupCheckin.classList.remove("modal-errorcheckin");
        setTimeout(function () {
            popupCheckin.classList.add("modal-errorcheckin");
        }, 0);
    } else {
        loginName = loginCheckin.value;
        let LoginPassword = passwordCheckin.value;
        localStorage[loginName] = LoginPassword;
        evt.preventDefault();
        popupCheckin.classList.remove("modal-backcheckin");
        popupCheckin.classList.remove("modal-showcheckin");
        popupCheckin.classList.remove("modal-errorcheckin");
        let span = document.createElement("span");
        span.innerHTML = `Добро пожаловать ${loginName}`;
        document.body.insertBefore(span, linkLog);
        let a = document.createElement('a');
        document.body.replaceChild(a, linkLog);
        a.innerHTML = `Выйти`;
        a.setAttribute('class', 'close');
        a.setAttribute('href', 'index.html');
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


// setTimeout(function () {
//     console.log(`имя ${loginName}`)
// }, 15000);
