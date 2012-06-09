var title = Ti.UI.createLabel({
	text:data[i].title,
	font:{fontSize:14},
	color:'#257CBC',
	top:10,
	height:40,
	left:70,
	right:25
});
var username = Ti.UI.createLabel({
	text:data[i].date + ' - ' + data[i].username,
	font:{fontSize:14},
	color:'#666',
	top:50,
	left:70,
	height:15,
	right:15
});
var numPosts = Ti.UI.createLabel({
	color:'#999',
	font:{fontSize:10},
	text:data[i].posts + ' ' + L('respuestas'),
	top:3,
	right:5,
	height:10,
});
var image = Ti.UI.createImageView({
	image: 'https://twimg0-a.akamaihd.net/profile_images/1350365115/guille_normal.jpg',
	left:10,
	top:15,
	width:48
});

var margin = 7;

var content = Ti.UI.createView({
	backgroundColor:'#FFF',
	height:80,
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
content.username = username;
content.image = image;
content.numPosts = numPosts;
content.id = data[i].id;

content.add(title);
content.add(username);
content.add(numPosts);
content.add(image);

var row = Ti.UI.createTableViewRow({
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
});

row.add(content);
tableData.push(row);

//view.add(content);

content.addEventListener('click', function(e) {
	if (e.source.index) {
		var current = e.source;
	} else {
		var current = e.source.parent;
	}
	
	var post = Ti.UI.createWindow({
		title:current.title.text,
		url:'post.js',
		backgroundColor:'#FFF',
		barColor:'#429BDA'
	});
	
	var animation = Ti.UI.createAnimation({
		backgroundColor:'#429BDA',
		duration:300
	});
	
	post.current = current;
	
	animation.addEventListener('complete', function() {
		current.backgroundColor = '#FFF';
	});
	current.animate(animation);
	
	//win.nav.open(post);
	Ti.UI.currentTab.open(post);
});
