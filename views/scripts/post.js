var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       const data = xhttp.responseText;
       showData(JSON.parse(data));
    }
};
xhttp.open("GET", "./data/posts.json", true);
xhttp.send();

function showData(d) {
    var container = document.getElementById('posts');
    var postsHTML = [];
    for(var i=0;i<d.posts.length;i++) {
        postsHTML.push(
            `
            <!-- START POST -->
            <article class="media content-section">
                <div class="media-body">
                    <div class="article-metadata">
                        <a class="mr-2" href="#"></a>
                        <small class="text-muted">By ${d.posts[i].author} on ${d.posts[i].date_posted}</small>
                    </div>
                    <h2><a class="article-title" href="#">${d.posts[i].title}</a></h2>
                    <p class="article-content">${d.posts[i].content}</p>
                </div>
            </article>
            <!-- END POST -->
            `
        );
    }
    var evalString = "";
    for(var j=0;j<postsHTML.length;j++) {
        evalString = evalString + postsHTML[j];
    }
    container.innerHTML = evalString;
}

function sendMessage(title, content, author) {
    var d = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var hours = [0,1,2,3,4,5,6,7,8,9,10,11];
    var hour_min = (d.getHours()>=12||(d.getHours()>12&&d.getMinutes()>=1)) ? `${hours[d.getHours()]}:${d.getMinutes()} PM` : `${hours[d.getHours()]}:${d.getMinutes()} AM`;
    var date_posted = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}, at ${hour_min}`;
    window.open(`http://tweeter.awesomehelper.repl.co/post?data={"author": "${author}","title": "${title}","content": "${content}","date_posted": "${date_posted}"}`);
}
