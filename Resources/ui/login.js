var win = Ti.UI.currentWindow;

if (!Ti.App.Properties.getString('login')) {
	if (Ti.Facebook.loggedIn) {
		Ti.Facebook.logout();
	}
}

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
	autocapitalization:Ti.UI.TEXT_AUTOCAPITALIZATION_NONE
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
	//user.focus();
}, 300);

var register = Ti.UI.createLabel({
	text:L('Si no tienes cuenta, regístrate'),
	color:'#429BDA',
	top:20
});

view.add(user);
view.add(password);

register.addEventListener('click', function() {
	var registerWin = Ti.UI.createWindow({
		title:L('Registro'),
		url:'register.js',
		barColor:'#429BDA'
	});
	registerWin.parentWin = win;
	if (typeof Ti.UI.currentTab != 'undefined') {
		Ti.UI.currentTab.open(registerWin);
	} else {
		registerWin.root = win.root;
		win.nav.open(registerWin);
	}
	
	//registerWin.root = win.root;
	//win.nav.open(registerWin);
	
	
	//Ti.Platform.openURL('http://elembarazo.net');
});

Ti.Facebook.appid = '79e6bd59041528981deb53e94c325651';
Ti.Facebook.permissions = ['email', 'user_birthday', 'user_hometown'];
Ti.Facebook.addEventListener('login', function(e) {
	var loging = Ti.UI.createView({
		backgroundColor:'#CCC',
		opacity:0.5,
	});
	var loading = Titanium.UI.createActivityIndicator({
	    message:L('Autentificando...'),
	    style:Titanium.UI.iPhone.ActivityIndicatorStyle.DARK,
	    top:'50%'
	});
	loging.add(loading);
	loading.show();
	win.add(loging);
    if (e.success) {
		realLogin();
    } else if (e.error) {
        alert(e.error);
    } else if (e.cancelled) {
    	loading.hide();
    	win.remove(loging);
        //alert("Cancelled");
    }
});
//Ti.Facebook.authorize();
//Titanium.Facebook.addEventListener('logout', function(e) {
    //alert('Logged out');
//});

var facebook = Ti.Facebook.createLoginButton({
	top:60,
	style:Ti.Facebook.BUTTON_STYLE_WIDE
});

view.add(register);
view.add(facebook);

win.add(view);

var facebookData = [];
function realLogin() {
	Ti.Facebook.requestWithGraphPath('me', {}, 'GET', function(e) { //?locale=es_ES
	    if (e.success) {
	    	Ti.Facebook.requestWithGraphPath('me', {fields:'picture', type:'square'}, 'GET', function(e2) {
	    		if (e2.success) {
	    			Ti.Facebook.requestWithGraphPath('me', {fields:'picture', type:'large'}, 'GET', function(e3) {
	    				if (e3.success) {
			    			facebookData = eval('(' + e.result + ')');
			    			facebookData['pic_square'] = eval('(' + e2.result + ')')['picture'];
			    			facebookData['pic_big'] = eval('(' + e3.result + ')')['picture'];
			        		Ti.include('/flogin.js');
			        	}
			      });
	    		}
	    	});
	    } else if (e.error) {
	        alert(e.error);
	    } else {
	        alert('Unknown response');
	    }
	});
}
