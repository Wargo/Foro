var title = Ti.UI.createLabel({
	text:data[i].title,
	font:{fontSize:14},
	color:'#257CBC',
	top:0,
	height:40,
	left:10,
	right:25
});
var auxView = Ti.UI.createView({
	layout:'horizontal',
	top:2,
	left:10,
	height:15,
	right:15
});
var dateLabel = Ti.UI.createLabel({
	text:data[i].date,
	font:{fontSize:13},
	color:'#666',
	height:15,
});
var usernameLabel = Ti.UI.createLabel({
	//text:' (' + data[i].username + ')',
	text:' - ' + data[i].username + ' - ',
	font:{fontSize:13},
	color:'#666',
	height:15,
});
var numComments = Ti.UI.createLabel({
	color:'#666',
	font:{fontSize:13},
	text:data[i].comments == 1 ? '1 comentario' : data[i].comments + ' comentarios',
	height:15,
});
auxView.add(dateLabel);
auxView.add(usernameLabel);
auxView.add(numComments);

if (Ti.App.strpos(data[i].date, 'segundo') || Ti.App.strpos(data[i].date, 'minuto')) { // TODO distinto para idiomas
	dateLabel.color = '#72AD34';
}

var image = Ti.UI.createImageView({
	image:data[i].photo,
	defaultImage:'images/clock.png',
	//left:10,right:10,top:10,bottom:10
	//width:300,
	top:15,
	height:275,
	width:275
});

var margin = 7;

var content = Ti.UI.createView({
	backgroundColor:'#FFF',
	//height:80,
	left:margin,
	right:margin,
	//top:0,
	//bottom:1,
	layout:'vertical'
});

content.index = i + 1;
content.title = title;
content.numPosts = numComments;
content.id = data[i].id;
content.image = image;

content.add(image);
content.add(title);
content.add(auxView);

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
	
	if (typeof current.title == 'undefined') {
		return;
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
