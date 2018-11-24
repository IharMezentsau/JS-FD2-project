import Promise from "promise-polyfill";
import {PubSubService} from "./PubSubService";

export class ChanelModel {
	constructor(user) {
		this.ajaxHandlerScript = "http://fe.it-academy.by/AjaxStringStorage2.php";
		this.stringPerson = 'CHUPILIN_CHAT';
		this.stringChanel = 'CHANEL_STORAGE';
		this.chanelTemp = undefined,
		this.personTemp = undefined;
		this.user = user;
	}

	getStorage(storage) {
		return new Promise((resolve, reject) => {
			$.ajax({
				url : this.ajaxHandlerScript,
				type : 'POST',
				cache : false,
				dataType:'json',
				data : { 
					f : 'READ', 
					n : storage 
				},
				success : resolve,
				error : reject
			})
		})
	}

	storeInfo(storage) {
		this.updatePassword=Math.random();
		return new Promise((resolve, reject) => {
			$.ajax({
				url : this.ajaxHandlerScript, 
				type : 'POST', 
				cache : false, 
				dataType:'json',
				data : { 
					f : 'LOCKGET', 
					n : storage, 
					p : this.updatePassword
				},
				success : resolve,
				error : reject
			});
		});
	}

	lockGetReady(callresult, storage, info) {
		if ( callresult.error!=undefined )
			console.log(callresult.error);
		else {
			$.ajax( {
				url : this.ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
				data : { f : 'UPDATE', n : storage, v : JSON.stringify(info), p : this.updatePassword },
				success : this.updateReady,
				error : this.errorHandler
			});
		}
	}

	updateReady(callresult) {
		if (callresult.error !== undefined) {
			console.log(callresult.error);
		}
	}

	errorHandler(error, textStatus, errorStr) {
		if (error.status == 0) {
			new PubSubService().pub('onError', 400);
		} else {
			new PubSubService().pub('onError', 500);
		}
		
		console.log(textStatus + ' ' + errorStr);
	}
}
