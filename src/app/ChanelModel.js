export class ChanelModel {
	constructor(user) {
		this.ajaxHandlerScript = "http://fe.it-academy.by/AjaxStringStorage2.php";
		//this.stringPerson = 'CHUPILIN_CHAT';
		this.stringPerson = 'CHUPILIN_DRINK_STORAGE';
		this.stringChanel = 'CHANEL_STORAGE';
		this.chanelTemp = undefined,
		this.personTemp = undefined;
		this.user = user;
	}

	getStorage(storage) {
		return new Promise((resolve, reject) => {
			$.ajax(
				{
					url : this.ajaxHandlerScript,
					type : 'POST',
					cache : false,
					dataType:'json',
					data : { f : 'READ', n : storage },
					success : resolve,
          error : reject
					//error : this.errorHandler
				}
			)
		})
	}

	storeInfo(storage, info) {
		updatePassword=Math.random();
		return $.ajax( {
				url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
				data : { f : 'LOCKGET', n : storage, p : updatePassword },
				success : (a) => this.lockGetReady(a, storage, info),
				error : this.errorHandler
			}
		);
	}

	lockGetReady(callresult, storage, info) {
		if ( callresult.error!=undefined )
			console.error(callresult.error);
		else {
			//let info = {all:["andrei","vika","dima","maks"]};
			$.ajax( {
				url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
				data : { f : 'UPDATE', n : storage, v : JSON.stringify(info), p : updatePassword },
				success : this.updateReady,
				error : this.errorHandler
			});
		}
	}

	updateReady(callresult) {
		if (callresult.error !== undefined)
			console.log(callresult.error);
	}

	errorHandler(jqXHR, statusStr, errorStr) {
		console.log(statusStr + ' ' + errorStr);
	}
}
