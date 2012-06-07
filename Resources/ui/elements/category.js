var title = Ti.UI.createLabel({
	text:data[i].title,
	font:{fontSize:14},
	color:'#257CBC',
	top:0,
	height:40,
	left:15,
	right:35
});

var margin = 7;

var content = Ti.UI.createView({
	backgroundColor:'#FFF',
	height:40,
	left:margin,
	right:margin,
	top:0,
	bottom:1
});

if (i == 0) {
	content.top = margin;
	//content.borderRadius = 5;
}
if (i == data.length - 1) {
	content.bottom = margin;
}

content.index = i + 1;
content.title = title;

content.add(title);
view.add(content);

content.addEventListener('click', function(e) {
	if (e.source.index) {
		var current = e.source;
	} else {
		var current = e.source.parent;
	}
	
	var posts = Ti.UI.createWindow({
		title:current.title.text,
		//url:'posts.js',
		url:url,
		backgroundColor:'#FFF',
		barColor:'#429BDA'
	});
	
	var animation = Ti.UI.createAnimation({
		backgroundColor:'#429BDA',
		duration:300
	});
	
	posts.current = current;
	
	animation.addEventListener('complete', function() {
		current.backgroundColor = '#FFF';
	});
	current.animate(animation);
	
	//win.nav.open(post);
	Ti.UI.currentTab.open(posts);
});