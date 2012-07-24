var win = Ti.UI.currentWindow;

//win.addEventListener('focus', function() {
if (Ti.App.Properties.getString('login')) {
	var help = require('help');
	help(L('Modificar foto de perfil'), true);
}
//});

win.backgroundColor = '#FFF';
win.title = L('Tu perfil');
win.barColor = '#429BDA';
//win.layout = 'vertical';

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
	left:margin,
	right:margin,
	top:margin,
	layout:'horizontal',
	height:170,
	opacity:0
});

var user = Ti.UI.createView({
	layout:'vertical'
});

var image = Ti.UI.createImageView({
	defaultImage:'images/clock.png',
	left:15,
	top:15,
	width:48,
	height:48
});
var username = Ti.UI.createLabel({
	font:{fontSize:14},
	color:'#257CBC',
	top:5,
	left:20,
	right:15
});
var name = Ti.UI.createLabel({
	font:{fontSize:14},
	color:'#333',
	top:5,
	left:20,
	right:15
});
var registered = Ti.UI.createLabel({
	font:{fontSize:14},
	color:'#999',
	top:5,
	left:20,
	right:15
});
var numPosts = Ti.UI.createLabel({
	font:{fontSize:14},
	color:'#999',
	top:5,
	left:20,
	right:15
});
var email = Ti.UI.createLabel({
	font:{fontSize:14},
	color:'#999',
	top:5,
	left:20,
	right:15
});

var register = Ti.UI.createLabel({
	text:'', //L('Si no tienes cuenta, regístrate'),
	color:'#429BDA',
	top:15,
	left:20,
	font:{fontSize:14}
});
register.addEventListener('click', function() {
	Ti.Platform.openURL('http://elembarazo.net/wp-login.php');
});

var changeAvatar = Ti.UI.createButton({
	systemButton:Ti.UI.iPhone.SystemButton.CAMERA
});
changeAvatar.addEventListener('click', function() {
	var dialog = Ti.UI.createOptionDialog({
	    title: L('Elige de dónde quieres obtener la imagen'),
	    options: [L('Cámara'), L('Galería'), L('Cancelar')],
	    cancel:2
	});
	dialog.show();
	
	dialog.addEventListener('click', function(e) {
		if (e.index == 0) {
			camera();
		} else if (e.index == 1) {
			gallery();
		}
	});
});

function gallery() {
	Ti.Media.openPhotoGallery({
		mediaType:[Ti.Media.MEDIA_TYPE_PHOTO],
		success: function(e) {
			Ti.include('/uploadPhoto.js');
			upload(e);
		},
		cancel: function() {
			
		},
		error: function(e) {
			var error = Ti.UI.createAlertDialog({
				ok:L('Ok'),
				title:L('Error'),
				message:L('Ha ocurrido un error con la galería')
			});
			error.show();
		},
		allowEditing:true
	})
}

function camera() {
	Ti.Media.showCamera({
		mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO],
		success: function(e) {
			Ti.include('/uploadPhoto.js');
			upload(e);
		},
		cancel: function() {
			
		},
		error: function(e) {
			var error = Ti.UI.createAlertDialog({
				ok:L('Ok'),
				title:L('Error'),
				message:L('Ha ocurrido un error con la cámara')
			});
			error.show();
		},
		allowEditing:true,
		saveToPhotoGallery:true
	});
}

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

var anim = Ti.UI.createAnimation({opacity:1,duration:300});
setTimeout(function() {
	content.animate(anim);
}, 300);

image.addEventListener('click', function(e) {
	if (!Ti.App.Properties.getString('login')) {
		return;
	}
	var imageUrl = e.source.big;
	
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
	title:L('Desconectar')
});
disconnect.addEventListener('click', function() {
	var confirm = Ti.UI.createAlertDialog({
		title:L('Desconectar'),
		message:L('¿Seguro que deseas desconectarte?'),
		buttonNames:[L('Sí'), L('No')],
		cancel:1
	});
	confirm.show();
	
	confirm.addEventListener('click', function(e) {
		if (e.index === e.cancel || e.cancel === true) { // Comparador iOS y Android
			return;
		}
		Ti.App.Properties.setString('login', null);
		Ti.App.Properties.setString('user', null);
		Ti.App.Properties.setString('pass', null);
		Ti.App.Properties.setString('token', null);
		if (Ti.Facebook.loggedIn) {
			Ti.Facebook.logout();
		}
		switchPage(win);
	});
});

var goLogin = Ti.UI.createButton({
	title:L('Acceder')
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
		if (currentStatus == 'out') {
			switchPage(win);
		}
	} else {
		if (currentStatus == 'in') {
			switchPage(win);
		}
	}
});

function switchPage(win) {
	if (Ti.App.Properties.getString('login')) {
		currentStatus = 'in';
		win.rightNavButton = disconnect;
		win.leftNavButton = changeAvatar;
		
		Ti.include('/user.js');
		var interval = setInterval(function() {
			if (userData) {
				clearInterval(interval);
				username.text = userData[0].login;
				name.text = userData[0].name;
				registered.text = userData[0].date;
				image.image = userData[0].avatar;
				image.big = userData[0].avatar_big;
				numPosts.text = userData[0].num_posts == 1 ? '1 post' : userData[0].num_posts + ' posts';
				email.text = userData[0].email;
				register.text = L('Para editar tus datos, pincha aquí');
				if (typeof rowMessages != 'undefined') {
					rowMessages.add(c);
				} else {
					Ti.include('messages.js');
				}
				//Ti.include('/notifications.js');
				check_notifications();
				var help = require('help');
				help(L('Modificar foto de perfil'), true);
			}
			if (error) {
				clearInterval(interval);
				username.text = '';
				name.text = L('No estás autentificado');
				registered.text = '';
				image.image = 'images/profile.png';
				image.big = 'images/profile.png';
				numPosts.text = '';
				email.text = '';
				register.text = ''; //L('Si no tienes cuenta, regístrate');
				if (typeof rowMessages != 'undefined') {
					rowMessages.remove(c);
				}
				//Ti.UI.currentTab.badge = null;
				check_notifications();
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
		image.big = 'images/profile.png';
		numPosts.text = '';
		email.text = '';
		register.text = ''; //L('Si no tienes cuenta, regístrate');
		if (typeof rowMessages != 'undefined') {
			rowMessages.remove(c);
		}
		//Ti.UI.currentTab.badge = null;
		check_notifications();
	}
}

Ti.include('/notifications.js');

if (Ti.App.Properties.getString('login')) {
	Ti.include('messages.js');
}