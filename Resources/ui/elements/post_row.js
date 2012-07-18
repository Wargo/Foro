var title = Ti.UI.createLabel({
	text:data[i].title,
	font:{fontSize:14},
	color:'#257CBC',
	top:10,
	height:40,
	left:70,
	right:25
});
var auxView = Ti.UI.createView({
	layout:'horizontal',
	top:50,
	left:69,
	height:20,
	right:15
});
var dateLabel = Ti.UI.createLabel({
	text:data[i].date,
	font:{fontSize:13},
	color:'#666',
	height:20,
});
var usernameLabel = Ti.UI.createLabel({
	text:' - ' + data[i].name,
	font:{fontSize:13},
	color:'#666',
	height:20,
});
auxView.add(dateLabel);
auxView.add(usernameLabel);

if (Ti.App.strpos(data[i].date, 'segundo') || Ti.App.strpos(data[i].date, 'minuto')) { // TODO distinto para idiomas
	dateLabel.color = '#72AD34';
}

var numPosts = Ti.UI.createLabel({
	color:'#999',
	font:{fontSize:10},
	text:data[i].posts == 1 ? '1 respuesta' : data[i].posts + ' respuestas',
	top:3,
	right:5,
	height:10,
});

var image = Ti.UI.createImageView({
	image:data[i].avatar,
	defaultImage:'images/clock.png',
	left:10,
	top:15,
	width:48,
	height:48
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

content.index = i + 1;
content.title = title;
content.numPosts = numPosts;
content.id = data[i].id;
content.open = data[i].open;
content.image = image;
content.auxView = auxView;

//auxView.title = '...'

content.add(image);
content.add(title);
content.add(auxView);
content.add(numPosts);

var row = Ti.UI.createTableViewRow({
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
});


if (page == 1 && i == 0) {
	content.top = margin;
}
row.add(content);
//tableView.appendRow(row);

if (page > 1) {
	tableView.appendRow(row);
} else {
	tableData.push(row);
	if (i == 0) {
		content.top = margin;
	}
	if (i == data.length - 1) {
		// Si no, al concatenar se queda feo
		//content.bottom = margin;
	}
}

if (loadFrom == '/messages.js') {
	if (data[i].unread > 0) {
		var badge = Ti.UI.createLabel({
			text:data[i].unread,
			color:'white',
			backgroundColor:'red',
			borderColor:'white',
			borderWidth:2,
			textAlign:'center',
			font:{fontSize:12,fontWeight:'bold'},
			width:18,
			height:18,
			bottom:1,
			left:1,
			borderRadius:6
		});
		image.add(badge);
	}
	var text = Ti.UI.createLabel({
		text:data[i].text,
		top:30,
		height:15,
		color:'#333',
		font:{fontSize:14},
		left:70,
		right:25
	});
	title.height = 15;
	content.add(text);
	var to = data[i].to[0].name
	if (data[i].num_to > 1) {
		var to = to + ' + ' + (data[i].num_to - 1);
	}
	var to_name = Ti.UI.createLabel({
		text:' - con ' + to,
		font:{fontSize:13},
		color:'#666',
		height:20,
	});
	auxView.remove(usernameLabel);
	auxView.add(to_name);
}

content.addEventListener('click', function(e) {
	if (e.source.index) {
		var current = e.source;
	} else {
		var current = e.source.parent;
		if (typeof current.title == 'undefined') {
			current = current.parent;
		}
	}
	
	if (typeof current.title == 'undefined') {
		return;
	}
	
	var post = Ti.UI.createWindow({
		title:current.title.text,
		url:'post.js',
		backgroundColor:'#FFF',
		barColor:'#429BDA'
	});
	
	if (loadFrom == '/messages.js') {
		post.messages = true;
		Ti.include('/markAsRead.js');
		markAsRead(current.id);
	} else {
		post.messages = false;
	}
	
	var animation = Ti.UI.createAnimation({
		backgroundColor:'#429BDA',
		duration:300
	});
	
	post.current = current;
	
	animation.addEventListener('complete', function() {
		current.backgroundColor = '#FFF';
	});
	current.animate(animation);
	
	Ti.UI.currentTab.open(post);
});
