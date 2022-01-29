const express = require('express');
const url = require('url');

const app = express();

app.get('/', (req, res) => {
	res.sendFile("./views/home.html", {root: __dirname});
});

app.get('/home', (req, res) => {
	res.sendFile("./views/home.html", {root: __dirname});
});

app.get('/login', (req, res) => {
    res.sendFile("./views/login.html", {root: __dirname});
});

app.get('/about', (req, res) => {
	res.sendFile("./views/about.html", {root: __dirname});
});

app.post('/loginhandler', (req, res) => {
    

	
});

app.get('/post', (req, res) => {
  var q = url.parse(req.url).query;
  var data = JSON.parse(decodeURIComponent(q.split('=')[1]));
  res.send(data);
})


app.get('/logout', (req, res) => {
    try {
        req.session.destroy((err) => {
            res.redirect('/')
        })
    }
    catch(err) {
        res.sendFile("./views/logout.html", {root: __dirname});
    }
})

// STATIC RESOURCES

app.get('/styles/main.css', (req, res) => {
  res.sendFile("./views/styles/main.css", {root: __dirname});
});

app.get("/scripts/post.js", (req, res) => {
    res.sendFile("./views/scripts/post.js", {root: __dirname});
});

app.get("/data/posts.json", (req, res) => {
    res.sendFile("./posts.json", {root: __dirname});
});

app.get("/images/tweeter.ico", (req, res) => {
    res.sendFile("./views/images/tweeter.ico", {root: __dirname});
});

app.get("/scripts/login.js", (req, res) => {
    res.sendFile("./views/scripts/login.js", {root: __dirname});
})

// PORT / LISTENER

app.listen(3000, () => {
  console.log('server started');
});


// HELP FOR ME CAUSE IM DUMB
app.get("/paths", (req, res) => {
    res.send(`
    /<br />
    /home<br />
    /post?data=data<br />
    /styles/main.css<br />
    /scripts/post.js<br />
    /data/posts.json<br />
    /images/tweeter.ico<br />
    <br />
    /paths
    `)
})

app.use(function (req, res, next) {
    console.log(`404 error while requesting: ${url.parse(url.req).pathname}`)
    res.status(404).sendFile("./views/404.html", {root: __dirname})
})