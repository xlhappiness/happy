
function setSessionStorage( key , value ){
	window.sessionStorage.setItem(key , value);
}

function getSessionStorage( key ){
	return window.sessionStorage.getItem(key);
}

export {
	setSessionStorage,
	getSessionStorage
}