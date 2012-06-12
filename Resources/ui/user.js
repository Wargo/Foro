var win = Ti.UI.currentWindow;
var margin = 7;

var view = Ti.UI.createScrollView({
	backgroundColor: '#DDD',
	layout: 'vertical',
	contentHeight:'auto',
	showVerticalScrollIndicator: true
});

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
	height:100
});

var image = Ti.UI.createImageView({
	image: 'https://twimg0-a.akamaihd.net/profile_images/1350365115/guille_normal.jpg',
	left:15,
	top:15,
	width:48
});
var username = Ti.UI.createLabel({
	text:win.current.username,
	font:{fontSize:14},
	color:'#257CBC',
	top:10,
	left:80,
	right:35
});
var name = Ti.UI.createLabel({
	text:win.current.name,
	font:{fontSize:14},
	color:'#333',
	top:30,
	left:80,
	right:35
});
var registered = Ti.UI.createLabel({
	text:L('Fecha registro') + ': ' + win.current.registered,
	font:{fontSize:14},
	color:'#999',
	top:50,
	left:80,
	right:35
});

user.add(image);
user.add(name);
user.add(username);
user.add(registered);
content.add(user);

view.add(content);
win.add(view);

image.addEventListener('click', function() {
	var imageUrl = 'http://profile.ak.fbcdn.net/hprofile-ak-snc4/202890_1154122999_7801142_n.jpg';
	
	var imageBigWin = Ti.UI.createWindow({
		title:'Nombre usuario',
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
