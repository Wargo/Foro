var title = Ti.UI.createLabel({
	text:data[i].name,
	font:{fontSize:14},
	color:'#257CBC',
	top:10,
	height:40,
	left:70,
	right:80
});

var image = Ti.UI.createImageView({
	image:data[i].avatar,
	defaultImage:'images/clock.png',
	left:10,
	top:15,
	width:48,
	height:48
});

var add = Ti.UI.createImageView({
	image:'images/addFriendGreen.png',
	right:20
})

var content = Ti.UI.createView({
	backgroundColor:'#FFF',
	height:80,
	left:7,
	right:7,
	top:0,
	bottom:1
});

content.add(image);
content.add(title);
content.add(add);

var row = Ti.UI.createTableViewRow({
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	//title:data[i].name
});
row.add(content);

if (page > 1) {
	tableView.appendRow(row);
} else {
	tableData.push(row);
}

content.index = 1;
content.username = data[i].username;
content.name = data[i].name;
content.registered = data[i].registered;
content.avatar = data[i].avatar;
content.avatar_big = data[i].avatar_big;
content.num_posts = data[i].num_posts;
content.user_id = data[i].id;

content.addEventListener('click', function(e) {
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