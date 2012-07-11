var title = Ti.UI.createLabel({
	text:data[i].title,
	font:{fontSize:14},
	color:'#257CBC',
	top:300,
	height:40,
	left:15,
	right:25,
	width:200
});
var dateLabel = Ti.UI.createLabel({
	text:data[i].date,
	font:{fontSize:13},
	color:'#666',
	height:15,
	right:20,
	top:340,
	bottom:20
});
var usernameLabel = Ti.UI.createLabel({
	text:data[i].username,
	font:{fontSize:13},
	color:'#666',
	height:15,
	left:15,
	top:340,
	bottom:20
});
var numComments = Ti.UI.createLabel({
	color:'#666',
	font:{fontSize:13},
	//text:data[i].comments == 1 ? '1 comentario' : data[i].comments + ' comentarios',
	text:data[i].comments,
	height:15,
	right:35,
	top:310
});
var icoComments = Ti.UI.createImageView({
	image:'images/foro.png',
	width:15,
	height:15,
	right:15,
	top:312
});

if (Ti.App.strpos(data[i].date, 'segundo') || Ti.App.strpos(data[i].date, 'minuto')) { // TODO distinto para idiomas
	dateLabel.color = '#72AD34';
}

var image = Ti.UI.createImageView({
	image:data[i].photo,
	defaultImage:'images/clock.png',
	top:15,
	height:275,
	width:275
});
image.imageBig = data[i].photoBig;

var margin = 7;

var content = Ti.UI.createView({
	backgroundColor:'#FFF',
	left:margin,
	right:margin,
	//layout:'vertical'
});

content.index = i + 1;
content.title = title;
content.numPosts = numComments;
content.id = data[i].id;
content.image = image;

content.add(image);
content.add(title);
content.add(numComments);
content.add(icoComments);
content.add(dateLabel);
content.add(usernameLabel);

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
		url:'photo.js',
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
	
	Ti.UI.currentTab.open(post);
});
