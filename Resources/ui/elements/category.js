var title = Ti.UI.createLabel({
	text:data[i].title,
	font:{fontSize:14},
	color:'#257CBC',
	top:0,
	height:40,
	left:15,
	right:35
});

var numTopics = Ti.UI.createLabel({
	color:'#999',
	font:{fontSize:13},
	text:data[i].topics + ' Temas',
	top:5,
	right:5,
	height:10
});

var numPosts = Ti.UI.createLabel({
	color:'#999',
	font:{fontSize:13},
	text:data[i].posts + ' Posts',
	bottom:5,
	right:5,
	height:10
});

var when = Ti.UI.createLabel({
	color:'#999',
	font:{fontSize:13},
	text:data[i].date,
	bottom:5,
	right:5,
	height:10
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

content.index = i + 1;
content.title = title;
content.id = data[i].id;

content.add(title);

if (data[i].topics > 0) {
	content.add(numTopics);
}
if (data[i].date) {
	if (Ti.App.strpos(data[i].date, 'segundo') || Ti.App.strpos(data[i].date, 'minuto')) { // TODO
		when.color = '#72AD34';
	}
	content.add(when);
}
/*
if (data[i].posts > 0) {
	content.add(numPosts);
}
*/

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
	}
	
	var posts = Ti.UI.createWindow({
		title:current.title.text,
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