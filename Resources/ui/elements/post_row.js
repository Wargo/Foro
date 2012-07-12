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
	text:' - ' + data[i].username,
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

row.add(content);

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
