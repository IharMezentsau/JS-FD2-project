export class AuthController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.render();
        this.authEventFormAscent(view);
        this.authEventSubmitForm(model, view);
        this.authEventCloseByClickForm(view);
        this.authEventCloseByEscForm(view);
        this.checkinEventFormAscent(view);
        this.checkinEventSubmitForm(model, view);
        this.checkinEventCloseByClickForm(view);
        this.checkinEventCloseByEscForm(view);
        //this.view.btnAnimate();
    }
// События АВТОРТЗАЦИИ(вход зарегестрированных пользователей)------------------------------------------------------------
    authEventFormAscent(view) {      //событие всплытя окна регистрации
        document.getElementById("login-link").addEventListener("click", function (evt) {
            view.authFormAscent(evt);
        });
    }
    authEventSubmitForm(model, view) {       //событие проверки формы до отправки на сервер, отправка данных на сервер
        document.getElementById("formlog").addEventListener("submit", function (evt) {
            view.authFormSubmit(evt, model, view)
        });
    }
    authEventCloseByClickForm(view) {        // событие закрытия окна авторизации по клику
        document.getElementById("modal-close").addEventListener("click", function (evt) {
            view.authWindowCloseClick(evt);
        });
    }
    authEventCloseByEscForm(view) {      // событие закрытия окна авторизации по нажатию клавишы esc
        window.addEventListener("keydown", function (evt) {
            view.authWindowCloseEscape(evt);
        });
    }
// События АВТОРТЗАЦИЯ(вход зарегестрированных пользователей)------------------------------------------------------------
// События РЕГИСТРАЦИЯ------------------------------------------------------------
    checkinEventFormAscent(view) {      //событие всплытя окна регистрации
        document.getElementById("restore").addEventListener('click', function (evt) {
            view.checkinFormAscent(evt);
        });
        document.getElementById("login-reg").addEventListener('click', function (evt) {
            view.checkinFormAscent(evt);
        });
    }
    checkinEventSubmitForm(model, view) {       //событие проверки формы до отправки на сервер, отправка данных на сервер
        document.getElementById("form-checkin").addEventListener("submit", function (evt) {
            view.checkinFormSubmit(evt, model, view);
        });
    }
    checkinEventCloseByClickForm(view) {        // событие закрытия окна регистрации по клику
        document.getElementById("modal-closecheckin").addEventListener("click", function (evt) {
            view.checkinWindowCloseClick(evt)
        });
    }
    checkinEventCloseByEscForm(view) {      // событие закрытия окна регистрации по нажатию клавишы esc
        window.addEventListener("keydown", function (evt) {
            view.checkinWindowCloseEscape(evt);
        });
    }
// События РЕГИСТРАЦИЯ------------------------------------------------------------
}
