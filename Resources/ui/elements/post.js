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
	//image: 'https://twimg0-a.akamaihd.net/profile_images/1350365115/guille_normal.jpg',
	image:data[i].avatar,
	defaultImage:'images/clock.png',
	left:15,
	top:15,
	width:48,
	height:48
});
var name = Ti.UI.createLabel({
	text:data[i].username,
	font:{fontSize:14},
	color:'#257CBC',
	top:20,
	left:80,
	right:35,
	height:15
});
var date = Ti.UI.createLabel({
	text:data[i].date,
	font:{fontSize:14},
	color:'#999',
	top:40,
	left:80,
	right:35,
	height:15
});
var viewUser = Ti.UI.createLabel({
	text:'>',
	font:{fontSize:14},
	color:'#999',
	top:30,
	right:15,
	height:15
});

user.username = data[i].username;
user.name = data[i].name;
user.registered = data[i].registered;
user.avatar = data[i].avatar;
user.avatar_big = data[i].avatar_big;
user.num_posts = data[i].num_posts;
user.user_id = data[i].user_id;

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

//var text = Ti.UI.createWebView({
	//html:data[i].text,
var text = Ti.UI.createLabel({
	//text:data[i].text.replace('<p>', '').replace('</p>', '').replace('<br />', '\r\n'), //.replace('\&lt;\\\/p\&gt;', '').replace('&lt;/p&gt;', ''),
	text:data[i].text,
	font:{fontSize:14},
	color:'#333',
	//top:40,
	top:10,
	left:15,
	height:'auto',
	right:10,
	bottom:15
});

//message.add(title);
message.add(text);
content.add(message);

var row = Ti.UI.createTableViewRow({
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
});

row.add(content);

/*
if (page > 1) {
	tableView.appendRow(row);
} else {
	tableData.push(row);
}
*/
tableData.push(row);

user.addEventListener('click', function(e) {
	if (e.source.index) {
		var current = e.source;
	} else {
		var current = e.source.parent;
	}
	
	var userWin = Ti.UI.createWindow({
		title:current.username,
		url:'user.js',
		backgroundColor:'#FFF',
		barColor:'#429BDA'
	});
	
	userWin.current = current;
	
	var animation = Ti.UI.createAnimation({
		backgroundColor:'#429BDA',
		duration:300
	});
	
	animation.addEventListener('complete', function() {
		current.backgroundColor = '#F2F2F2';
	});
	current.animate(animation);
	
	Ti.UI.currentTab.open(userWin);
});