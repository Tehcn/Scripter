(() => {
	// what
	let getCookie = cookie => document.cookie.split(';')
		.filter(c => c.split('=')[0] == cookie)[0].split('=')[1];
	
	document.querySelector('#welcome-message').innerHTML = `Welcome, ${getCookie('username')}`;
})();