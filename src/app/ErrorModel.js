export class ErrorModel {
    constructor(errorCode) {
        this.errorCode = errorCode;
        console.log('Model constructor');
    }

    getErrorCode() {
        return this.errorCode;
    }

    setErrorCode(errorCode) {
        this.errorCode = errorCode;
    }
}
