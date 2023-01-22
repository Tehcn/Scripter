let page = params.page;

if(page == '' || !page)
	render('home');
else
	render(page);

async function render(page) {
	let main = document.querySelector('main');

	let sres = await fetch('/pages/sidebar');
	let sidebar = await sres.text();
	
	fetch(`/pages/${page}`)
		.then(res => res.text())
		.then(text => { main.innerHTML = `<div class='row'>${text}${sidebar}</div>` })
		.then(() => {
			// dynamic js loading
			if(page == 'home') $.getScript('/static/scripts/posts.js');
			if(page == 'account') $.getScript('/static/scripts/account.js');
			if(page == 'login' || page == 'register' || page == 'post') $.getScript('/static/scripts/formerr.js');
		});
}