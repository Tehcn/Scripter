(() => {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		   const data = xhttp.responseText;
		   showData(JSON.parse(data));
		}
	};
	xhttp.open('GET', '/data/posts.json', true);
	xhttp.send();		
	
	function showData(d) {
		var container = document.getElementById('posts');
		var postsHTML = [];
		for(var i=0;i<d.posts.length;i++) {
			postsHTML.push(
				`
				<!-- START POST -->
				<article class='media content-section'>
					<div class='media-body'>
						<div class='article-metadata'>
							<a class='mr-2' href='#'></a>
							<small class='text-muted'>By ${d.posts[i].author} on ${d.posts[i].date_posted}</small>
						</div>
						<h2><a class='article-title' href='#'>${d.posts[i].title}</a></h2>
						<p class='article-content'>${d.posts[i].content}</p>
					</div>
				</article>
				<!-- END POST -->
				`
			);
		}
		var evalString = '';
		for(var j=0;j<postsHTML.length;j++) {
			evalString = evalString + postsHTML[j];
		}
		container.innerHTML = evalString;
	}
})();