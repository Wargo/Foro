var win = Ti.UI.currentWindow;

win.backgroundColor = '#FFF';
win.title = L('Tu perfil');
win.barColor = '#429BDA';
win.layout = 'vertical';

var emptyView = Titanium.UI.createView();

/*
 * Vista de usuario logueado
 */
var margin = 7;
var view = Ti.UI.createTableView({
	backgroundColor: '#DDD'
})

var content = Ti.UI.createView({
	backgroundColor:'#F2F2F2',
	borderRadius:5,
	//height:Ti.UI.SIZE,
	left:margin,
	right:margin,
	top:margin,
	layout:'horizontal',
	height:200
});

var user = Ti.UI.createView({
	//backgroundColor:'#FFF',
	layout:'vertical'
});

var image = Ti.UI.createImageView({
	//image: win.current.avatar,
	left:15,
	top:15,
	width:48,
	height:48
});
var username = Ti.UI.createLabel({
	//text:win.current.username,
	font:{fontSize:14},
	color:'#257CBC',
	top:5,
	left:20,
	right:15
});
var name = Ti.UI.createLabel({
	//text:win.current.name,
	font:{fontSize:14},
	color:'#333',
	top:5,
	left:20,
	right:15
});
var registered = Ti.UI.createLabel({
	//text:L('Fecha registro') + ': ' + win.current.registered,
	font:{fontSize:14},
	color:'#999',
	top:5,
	left:20,
	right:15
});
var numPosts = Ti.UI.createLabel({
	//text:L('Fecha registro') + ': ' + win.current.registered,
	font:{fontSize:14},
	color:'#999',
	top:5,
	left:20,
	right:15
});
var email = Ti.UI.createLabel({
	//text:L('Fecha registro') + ': ' + win.current.registered,
	font:{fontSize:14},
	color:'#999',
	top:5,
	left:20,
	right:15
});

var register = Ti.UI.createLabel({
	text:L('Si no tienes cuenta, regístrate'),
	color:'#429BDA',
	top:15,
	left:20,
	font:{fontSize:14}
});
register.addEventListener('click', function() {
	Ti.Platform.openURL('http://elembarazo.net');
});

content.add(image);
user.add(username);
user.add(name);
user.add(registered);
user.add(numPosts);
user.add(email);
user.add(register);
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
	if (!Ti.App.Properties.getString('login')) {
		return;
	}
	var imageUrl = e.source.image;
	
	var imageBigWin = Ti.UI.createWindow({
		title:Ti.App.Properties.getString('user'),
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
/*
 * Fin vista usuario logueado
 */

var disconnect = Ti.UI.createButton({
	title:L('Desconectar'),
});
disconnect.addEventListener('click', function() {
	Ti.App.Properties.setString('login', null);
	Ti.App.Properties.setString('user', null);
	Ti.App.Properties.setString('pass', null);
	if (Ti.Facebook.loggedIn) {
		Ti.Facebook.logout();
	}
	switchPage(win);
});

var goLogin = Ti.UI.createButton({
	title:L('Login')
});
	
goLogin.addEventListener('click', function() {
	var login = Ti.UI.createWindow({url:'login.js'});
	login.p = win;
	login.switchPage = switchPage;
	Ti.UI.currentTab.open(login);
});

var currentStatus = '';

switchPage(win);

win.addEventListener('focus', function() {
	if (Ti.App.Properties.getString('login')) {
		//if (userLabel.text != Ti.App.Properties.getString('user')) {
		if (currentStatus == 'out') {
			switchPage(win);
		}
	} else {
		//if (userLabel.text != L('No estás autentificado')) {
		if (currentStatus == 'in') {
			switchPage(win);
		}
	}
});

function switchPage(win) {
	if (Ti.App.Properties.getString('login')) {
		currentStatus = 'in';
		win.rightNavButton = emptyView;
		win.leftNavButton = disconnect;
		
		Ti.include('/user.js');
		var interval = setInterval(function() {
			if (userData) {
				clearInterval(interval);
				username.text = userData[0].login;
				name.text = userData[0].name;
				registered.text = userData[0].date;
				image.image = userData[0].avatar;
				numPosts.text = userData[0].num_posts == 1 ? '1 post' : userData[0].num_posts + ' posts';
				email.text = userData[0].email;
				register.text = L('Para editar tus datos, pincha aquí');
			}
			if (error) {
				clearInterval(interval);
				username.text = '';
				name.text = L('No estás autentificado');
				registered.text = '';
				image.image = 'images/profile.png';
				numPosts.text = '';
				email.text = '';
				register.text = L('Si no tienes cuenta, regístrate');
			}
		}, 100);
	} else {
		currentStatus = 'out';
		win.rightNavButton = goLogin;
		win.leftNavButton = emptyView;
		
		username.text = '';
		name.text = L('No estás autentificado');
		registered.text = '';
		image.image = 'images/profile.png';
		numPosts.text = '';
		email.text = '';
		register.text = L('Si no tienes cuenta, regístrate');
	}
}
