var win = Ti.UI.currentWindow;

var saveButton = Ti.UI.createButton({
	title:L('Registrar')
});

win.rightNavButton = saveButton;

saveButton.addEventListener('click', function() {
	Ti.include('/register.js');
});

var view = Ti.UI.createScrollView({
	backgroundColor:'#FFF',
	layout:'vertical'
});

var user = Ti.UI.createTextField({
	hintText: L('Usuario'),
	top:20,
	left:15,right:15,
	backgroundColor:'#FFF',
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	autocapitalization:Ti.UI.TEXT_AUTOCAPITALIZATION_NONE
});

var pass = Ti.UI.createTextField({
	hintText: L('Contraseña'),
	passwordMask:true,
	top:20,
	left:15,right:15,
	backgroundColor:'#FFF',
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	autocapitalization:Ti.UI.TEXT_AUTOCAPITALIZATION_NONE
});

var repeatPass = Ti.UI.createTextField({
	hintText: L('Confirmar contraseña'),
	passwordMask:true,
	top:20,
	left:15,right:15,
	backgroundColor:'#FFF',
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	autocapitalization:Ti.UI.TEXT_AUTOCAPITALIZATION_NONE
});

var email = Ti.UI.createTextField({
	hintText: L('Email'),
	top:20,
	left:15,right:15,
	backgroundColor:'#FFF',
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	autocapitalization:Ti.UI.TEXT_AUTOCAPITALIZATION_NONE
});

var name = Ti.UI.createTextField({
	hintText: L('Nombre completo'),
	top:20,
	left:15,right:15,
	backgroundColor:'#FFF',
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	autocapitalization:Ti.UI.TEXT_AUTOCAPITALIZATION_NONE
});

setTimeout(function() {
	user.focus();
}, 300);

view.add(user);
view.add(pass);
view.add(repeatPass);
view.add(email);
view.add(name);

win.add(view);
