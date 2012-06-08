var win = Ti.UI.currentWindow;

var saveButton = Ti.UI.createButton({
	title:L('Registrar')
});

win.rightNavButton = saveButton;

saveButton.addEventListener('click', function() {
	win.root.close({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
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
	borderRadius:5,
	borderColor:'#999',
	height:30,
	paddingLeft:5,
	paddingRight:5
});

var password = Ti.UI.createTextField({
	hintText: L('Contraseña'),
	passwordMask:true,
	top:20,
	left:15,right:15,
	backgroundColor:'#FFF',
	borderRadius:5,
	borderColor:'#999',
	height:30,
	paddingLeft:5,
	paddingRight:5
});

var repeatPassword = Ti.UI.createTextField({
	hintText: L('Repetir contraseña'),
	passwordMask:true,
	top:20,
	left:15,right:15,
	backgroundColor:'#FFF',
	borderRadius:5,
	borderColor:'#999',
	height:30,
	paddingLeft:5,
	paddingRight:5
});

setTimeout(function() {
	user.focus();
}, 300);

view.add(user);
view.add(password);
view.add(repeatPassword);

win.add(view);
