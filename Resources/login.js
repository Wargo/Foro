var loging = Ti.UI.createView({
	backgroundColor:'#CCC',
	opacity:0.5,
});
var loading = Titanium.UI.createActivityIndicator({
    message:L('Autentificando...'),
    style:Titanium.UI.iPhone.ActivityIndicatorStyle.DARK,
    top:'50%'
});

if (!user.value || !password.value) {
	alert(L('Debes rellenar ambos campos.'));
} else {
	loging.add(loading);
	loading.show();
	win.add(loging);
	var error = '';
	var path = 'http://www.servidordeprueba.net/webs/foro/login.php';
	var client = Ti.Network.createHTTPClient({
		onload: function(e) {
			Ti.API.info('success ' + this.responseText);
			if (this.responseText != 0) {
				Ti.App.Properties.setString('login', this.responseText);
				Ti.App.Properties.setString('user', user.value);
				Ti.App.Properties.setString('pass', password.value);
				close();
			} else {
				alert(L('Usuario y/o contraseña erróneos'));
				loading.hide();
				win.remove(loging);
			}
		},
		onerror: function(e) {
			error = L('Ha ocurrido un error con la conexión');
			Ti.API.info('error');
			close();
		},
		timeout: 5000
	});
	
	client.open('POST', path);
	client.send({
		user:user.value,
		password:password.value
	});
}

function close() {
	loading.hide();
	win.remove(loging);
	if (typeof win.root != 'undefined') {
		win.root.close({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
	} else {
		Ti.UI.currentTab.open(Ti.UI.createWindow({url:'profile.js'}), {animated:false});
		//Ti.UI.currentTab.window = Ti.UI.createWindow({url:'profile.js'});
		//Ti.UI.currentTab.setWindow(Ti.UI.createWindow({url:'profile.js'}));
	}
}
