var win = Ti.UI.currentWindow;
var margin = 7;

var view = Ti.UI.createScrollView({
	backgroundColor: '#DDD',
	layout: 'vertical',
	contentHeight:'auto',
	showVerticalScrollIndicator: true
});

var content = Ti.UI.createView({
	backgroundColor:'#FFF',
	borderRadius:5,
	height:Ti.UI.SIZE,
	left:margin,
	right:margin,
	top:margin,
	layout:'vertical'
});

var user = Ti.UI.createView({
	backgroundColor:'#F2F2F2',
	height:80
});

var image = Ti.UI.createImageView({
	image: 'https://twimg0-a.akamaihd.net/profile_images/1350365115/guille_normal.jpg',
	left:15,
	top:15,
	width:48
});
var name = Ti.UI.createLabel({
	text:'Nombre usuario',
	font:{fontSize:14},
	color:'#257CBC',
	top:20,
	left:80,
	right:35
});
var date = Ti.UI.createLabel({
	text:'Hace 3 minutos',
	font:{fontSize:14},
	color:'#999',
	top:40,
	left:80,
	right:35
});
var viewUser = Ti.UI.createLabel({
	text:'>',
	font:{fontSize:14},
	color:'#999',
	top:30,
	right:15,
});

user.index = 1;
user.add(image);
user.add(name);
user.add(date);
user.add(viewUser);
content.add(user);

var message = Ti.UI.createView({
	backgroundColor:'#FFF',
	height:Ti.UI.SIZE
});

var title = Ti.UI.createLabel({
	text:win.current.title.text,
	font:{fontSize:14},
	color:'#257CBC',
	top:10,
	height:35,
	left:15,
	right:35
});

var text = Ti.UI.createLabel({
	text:win.current.intro.text + ' ' + win.current.intro.text + ' ' + win.current.intro.text,
	font:{fontSize:14},
	color:'#333',
	top:40,
	left:15,
	height:'auto',
	right:10,
	bottom:15
});

message.add(title);
message.add(text);
content.add(message);

view.add(content);
win.add(view);

user.addEventListener('click', function(e) {
	if (e.source.index) {
		var current = e.source;
	} else {
		var current = e.source.parent;
	}
	
	var user = Ti.UI.createWindow({
		title:'Nombre usuario',
		url:'user.js',
		backgroundColor:'#FFF',
		barColor:'#429BDA'
	});
	
	var animation = Ti.UI.createAnimation({
		backgroundColor:'#429BDA',
		duration:300
	});
	
	animation.addEventListener('complete', function() {
		current.backgroundColor = '#F2F2F2';
	});
	current.animate(animation);
	
	//win.nav.open(post);
	Ti.UI.currentTab.open(user);
});