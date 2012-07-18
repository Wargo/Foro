var title = Ti.UI.createLabel({
	text:data[i].title,
	font:{fontSize:13},
	color:'#55ACFF',
	//top:300,
	height:15,
	top:2,
	left:2,
	//right:25,
	width:90
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
	text:data[i].name,
	font:{fontSize:12},
	color:'#FFF',
	height:15,
	left:2,
	//top:340,
	bottom:2,
	width:60
});
var numComments = Ti.UI.createLabel({
	color:'#FFF',
	font:{fontSize:10},
	text:data[i].comments,
	height:15,
	//right:35,
	//top:310
	bottom:2,
	right:20
});
var icoComments = Ti.UI.createImageView({
	image:'images/foro.png',
	width:15,
	height:15,
	//right:15,
	//top:312
	bottom:2,
	right:2
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

var content = Ti.UI.createView({
	backgroundColor:'#000',
	opacity:0.6,
	bottom:-40,
	left:0,
	right:0,
	top:100
});

var button = Ti.UI.createLabel({
	opacity:0.1,
	zIndex:100,
	width:100,
	height:100,
	backgroundColor:'#000'
});

content.index = i + 1;
button.title = title.text;
button.numComments = numComments.text;
button.dateLabel = dateLabel.text;
button.usernameLabel = usernameLabel.text;
button.icoComments = icoComments.image;
button.id = data[i].id;
button._image = image;
button.image = image.image;
button.imageBig = image.imageBig;

//content.add(image);
content.add(title);
content.add(numComments);
content.add(icoComments);
//content.add(dateLabel);
content.add(usernameLabel);

image.add(button);
image._content = content;
//image._button = button;

image.addEventListener('load', function(e) {
	//e.source.add(e.source._button);
	var anim = Ti.UI.createAnimation({
		top:60,
		bottom:0,
		duration:300
	});
	e.source._content.animate(anim);
	e.source.add(e.source._content);
})

if (i % cols == 0) {
	var row = Ti.UI.createTableViewRow({
		selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
		layout:'horizontal'
	});
	tableView.appendRow(row);
}

image.width = image.height = size;
//image.left = space + (i % cols) * (size + space);
image.left = space;
//image.top = space + h * (size + space);
image.top = space;
if (i % cols == cols - 1) {
	//h ++;
}
//tableView.add(image);
row.add(image);

button.addEventListener('click', function(e) {
	var post = Ti.UI.createWindow({
		title:e.source.title,
		url:'photo.js',
		backgroundColor:'#FFF',
		barColor:'#429BDA'
	});
	
	var animation = Ti.UI.createAnimation({
		opacity:0.2,
		duration:150
	});
	
	//post.current = current;
	post.current = e.source;
	
	animation.addEventListener('complete', function() {
		//current.backgroundColor = '#FFF';
		e.source._image.opacity = 1;
	});
	//current.animate(animation);
	e.source._image.animate(animation);
	
	Ti.UI.currentTab.open(post);
});
