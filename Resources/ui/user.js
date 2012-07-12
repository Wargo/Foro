var win = Ti.UI.currentWindow;
var margin = 7;

var view = Ti.UI.createTableView({
	backgroundColor: '#DDD'
})

var content = Ti.UI.createView({
	backgroundColor:'#F2F2F2',
	borderRadius:5,
	height:Ti.UI.SIZE,
	left:margin,
	right:margin,
	top:margin,
	layout:'horizontal',
	height:160
});

var user = Ti.UI.createView({
	layout:'vertical'
});

var image = Ti.UI.createImageView({
	image: win.current.avatar,
	defaultImage:'images/clock.png',
	left:15,
	top:15,
	width:48,
	height:48
});
image.big = win.current.avatar_big;
var hiddenImage = Ti.UI.createImageView({
	image:win.current.avatar_big,
	height:1,
	width:1
});
var username = Ti.UI.createLabel({
	text:win.current.username,
	font:{fontSize:14},
	color:'#257CBC',
	top:5,
	left:20,
	right:15
});
var name = Ti.UI.createLabel({
	text:win.current.name,
	font:{fontSize:14},
	color:'#333',
	top:5,
	left:20,
	right:15
});
var registered = Ti.UI.createLabel({
	text:L('Registro') + ': ' + win.current.registered,
	font:{fontSize:14},
	color:'#999',
	top:5,
	left:20,
	right:15
});
var numPosts = Ti.UI.createLabel({
	text:win.current.num_posts == 1 ? '1 post' : win.current.num_posts + ' posts',
	font:{fontSize:14},
	color:'#999',
	top:5,
	left:20,
	right:15
});

content.add(image);
content.add(hiddenImage);
user.add(username);
user.add(name);
user.add(registered);
user.add(numPosts);
content.add(user);

var row = Ti.UI.createTableViewRow({
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
});

row.add(content);
var tableData = [];
tableData.push(row);
view.data = tableData;
win.add(view);

image.addEventListener('click', function(e) {
	var imageUrl = e.source.big;
	
	var imageBigWin = Ti.UI.createWindow({
		title:win.current.username,
		backgroundColor:'#000',
		barColor:'#429BDA'
	});
	
	var imageScrollView = Ti.UI.createScrollView({
		contentWidth: 'auto',
	    contentHeight: 'auto',
	    top: 0,
	    bottom: 0,
	    showVerticalScrollIndicator: false,
	    showHorizontalScrollIndicator: false,
	    maxZoomScale: 10,
	    minZoomScale: 1,
	    zoomScale: 1
	});
	
	var imageBig = Ti.UI.createImageView({
		image:imageUrl,
		width:'100%',
		height:'100%'
	});
	
	imageScrollView.add(imageBig);
	imageBigWin.add(imageScrollView);
	
	Ti.UI.currentTab.open(imageBigWin);
});
