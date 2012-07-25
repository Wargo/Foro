var win = Ti.UI.currentWindow;
var margin = 7;
win.title = win.current.name;

var view = Ti.UI.createTableView({
	backgroundColor: '#DDD'
});

var newMessage = Ti.UI.createButton({
	image:'images/message.png'
});
var addFriend = Ti.UI.createButton({
	image:'images/addFriend.png'
});

newMessage.addEventListener('click', function() {
	send_private_message();
});

addFriend.addEventListener('click', function() {
	send_invitation();
});

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
if (!Ti.App.Properties.getString('login')) {
	view.data = tableData;
}
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

var icon1 = Ti.UI.createImageView({
	image:'images/addFriendGreen.png',
	left:10,
	top:12
});
var icon2 = Ti.UI.createImageView({
	image:'images/mail.png',
	left:10,
	top:8
});
var text1 = Ti.UI.createLabel({
	left:20,
	right:20,
	top:10,
	text:L('Enviar solicitud de amistad'),
	textAlign:'center',
	color:'#AAA',
	font:{fontWeight:'bold',fontSize:16}
});
var text2 = Ti.UI.createLabel({
	left:20,
	right:20,
	top:10,
	text:L('Enviar mensaje privado'),
	textAlign:'center',
	color:'#AAA',
	font:{fontWeight:'bold',fontSize:16}
});
var send1 = Ti.UI.createView({
	borderColor:'#CCC',
	borderRadius:10,
	top:10,
	bottom:10,
	//right:40,
	//left:40,
	width:250,
	layout:'horizontal',
	backgroundColor:'#FFF'
});
var send2 = Ti.UI.createView({
	borderColor:'#CCC',
	borderRadius:10,
	top:10,
	bottom:10,
	//right:40,
	//left:40,
	width:250,
	layout:'horizontal',
	backgroundColor:'#FFF'
});

send1.add(icon1);
send1.add(text1);
var rowAddFriend = Ti.UI.createTableViewRow({
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	height:80
});
rowAddFriend.add(send1);

send2.add(icon2);
send2.add(text2);
var rowSendMessage = Ti.UI.createTableViewRow({
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	height:80
});
rowSendMessage.add(send2);

rowSendMessage.addEventListener('click', function() {
	send_private_message();
});

rowAddFriend.addEventListener('click', function() {
	send_invitation();
});

if (Ti.App.Properties.getString('login')) {
	Ti.include('/friends_id.js');
}

function send_private_message() {
	if (Ti.App.Properties.getString('login')) {
		var createPost = Ti.UI.createWindow({
			url:'answer.js',
			barColor:'#429BDA',
			title:L('Enviar mensaje')
		});
	} else {
		var createPost = Ti.UI.createWindow({
			url:'login.js',
			barColor:'#429BDA',
			title:L('Login')
		});
	}
	
	createPost.user_id = win.current.user_id;
	
	var nav = Ti.UI.iPhone.createNavigationGroup({
		window:createPost
	});
	var root = Ti.UI.createWindow();
	root.add(nav);
	root.open({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
	createPost.root = root;
	createPost.nav = nav;
}

function send_invitation() {
	if (addFriend.enabled == false) {
		return;
	}
	var confirm = Ti.UI.createAlertDialog({
		title:L('Agregar amiga'),
		message:L('¿Seguro que deseas enviarle una solicitud de amistad?'),
		buttonNames:[L('Sí'), L('No')],
		cancel:1
	});
	confirm.show();
	
	confirm.addEventListener('click', function(e) {
		if (e.index === e.cancel || e.cancel === true) { // Comparador iOS y Android
			return;
		}
		Ti.include('/addFriend.js');
		add_friend(win.current.user_id);
	});
}
