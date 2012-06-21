var win = Ti.UI.currentWindow;

win.title = L('Login');
win.barColor = '#429BDA';

var cancelButton = Ti.UI.createButton({
	title:L('Cancelar')
});
var saveButton = Ti.UI.createButton({
	title:L('Login')
});

win.leftNavButton = cancelButton;
win.rightNavButton = saveButton;

cancelButton.addEventListener('click', function() {
	if (typeof win.root != 'undefined') {
		win.root.close({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
	} else {
		//user.blur();
		//password.blur();
		win.close();
	}
});
saveButton.addEventListener('click', function() {
	user.blur();
	password.blur();
	Ti.include('/login.js');
});

var view = Ti.UI.createView({
	backgroundColor:'#FFF',
	layout:'vertical'
});

var user = Ti.UI.createTextField({
	hintText: L('Usuario'),
	top:20,
	left:15,right:15,
	backgroundColor:'#FFF',
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	autocapitalization:Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
});

var password = Ti.UI.createTextField({
	hintText: L('Contraseña'),
	passwordMask:true,
	top:20,
	left:15,right:15,
	backgroundColor:'#FFF',
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

setTimeout(function() {
	user.focus();
}, 300);

var register = Ti.UI.createLabel({
	text:L('Si no tienes cuenta, regístrate'),
	color:'#429BDA',
	top:30
});

view.add(user);
view.add(password);
view.add(register);

register.addEventListener('click', function() {
	/*
	var registerWin = Ti.UI.createWindow({
		title:L('Registro'),
		url:'register.js',
		barColor:'#429BDA'
	});
	registerWin.root = win.root;
	win.nav.open(registerWin);
	*/
	Ti.Platform.openURL('http://elembarazo.net');
});

win.add(view);
