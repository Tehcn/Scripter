// keep the session alive!

setInterval(keepAlive, 300000);

async function keepAlive() {
	if(document.cookie = '') return;
	console.log('keeping alive');
	let res = await fetch('/keep-alive');
	let status = await res.text();
	if(status != 'OK')
		console.error('Session is dead!');
}