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
	var path = Ti.App.dataURL + 'login.php';
	var client = Ti.Network.createHTTPClient({
		onload: function(e) {
			Ti.API.info('success ' + this.responseText);
			var result = eval('(' + this.responseText + ')');
			if (result['status'] == 'ok') {
				Ti.App.Properties.setString('login', result['id']);
				Ti.App.Properties.setString('user', user.value);
				Ti.App.Properties.setString('token', result['token']);
				//Ti.App.Properties.setString('pass', password.value);
				close();
			} else {
				alert(result['message']);
				loading.hide();
				win.remove(loging);
			}
		},
		onerror: function(e) {
			error = L('Ha ocurrido un error con la conexión');
			Ti.API.info('error');
			close();
		},
		timeout: 15000
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
		win.switchPage(win.p);
		win.close();
	}
}
