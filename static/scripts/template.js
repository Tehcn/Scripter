let page = params.page;

if(page == '' || !page)
	render('home');
else
	render(page);

let sidebar = `
<div class='col-md-4'>
	<div class='content-section'>
		<h3 class='sidebar-title'>Our Sidebar</h3>
		<p class='text-muted'>You can put any information here you'd like.
		<ul class='list-group'>
			<li class='list-group-item'>Latest Posts</li>
			<li class='list-group-item'>Announcements</li>
			<li class='list-group-item'>Calendars</li>
			<li class='list-group-item'>etc</li>
		</ul>
		</p>
	</div>
</div>`;

function render(page) {
	let main = document.querySelector('main');
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