const express = require('express');
const url = require('url');
const crypto = require('crypto');
const cors = require('cors');
const session = require('express-session');

const { users } = require('./users.json');
const { existsSync } = require('fs');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(session({ 
	secret: process.env['session-secret'],
	name: 'sessionID',
	saveUninitialized: false,
	resave: true,
	cookie: { maxAge: 36000 }
}));

const corsOptions = {
    origin: 'https://tweeter.awesomehelper.repl.co',  //Your Client, do not write '*'
    credentials: true,
};
app.use(cors(corsOptions));

// hash function
function sha256(str) {
	return crypto.createHash('sha256').update(str).digest('hex');
}

app.use((req, res, next) => {
	res.removeHeader("x-powered-by");
	next();
});

app.get('/', (req, res) => {
	res.sendFile('./views/index.html', { root: __dirname });
});

app.get('/pages/:page', (req, res) => {
	if(!existsSync(`./views/pages/${req.params.page}.html`)) {
		res.sendFile(`./views/pages/404.html`, { root: __dirname });
		return;
	}
	res.sendFile(`./views/pages/${req.params.page}.html`, { root: __dirname });
});

app.get('/user/data', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	res.send(req.session);
});

app.post('/login', (req, res) => {
	let email;
	let password;

	if(req.session.loggedIn) {
		res.redirect('/?page=login&err=Already logged in.');
		return;
	}
	
	try {
		email = req.body.email;
		password = sha256(req.body.password);
	} catch(err) {
		res.redirect('/?page=login&err=Internal Server Error.')
	}
	
	if(!users[email])
		res.redirect('/?page=login&err=Incorrect email or password.');
	
	let user = users[email];

	if(user.password != password)
		res.redirect('/?page=login&err=Incorrect email or password');

	req.session.loggedIn = true;
	req.session.username = user.username;
	
	res.status(202);
	res.redirect('/');
});

app.post('/post', (req, res) => {
	if(!req.session.loggedIn)
		res.redirect('/?page=post&err=Not logged in.').status(401);
	console.log(req.body);
	res.status(201);
	res.send(req.body);
});

app.get('/logout', (req, res) => {
    try {
        req.session.destroy((err) => {
            res.redirect('/');
        })
    }
    catch(err) {
        res.sendFile('./views/logout.html', { root: __dirname });
    }
})

// STATIC RESOURCES

app.get('/static/:folder/:file', (req, res) => {
	res.setHeader('Content-Type', 'text/'+req.params.file.split('.')[1]);
	res.sendFile(`static/${req.params.folder}/${req.params.file}`, { root: __dirname });
});

app.get('/data/:file', (req, res) => {
	if(req.params.file == 'users.json') res.sendStatus(404);
	res.sendFile(req.params.file, { root: __dirname });
});

// app.use(function (req, res, next) {
//     console.log(`404 error while requesting: ${url.parse(url.req).pathname}`)
//     res.status(404).sendFile('./views/404.html', {root: __dirname})
// })

// PORT / LISTENER
app.listen(3000, () => {
  console.log('server started');
});

