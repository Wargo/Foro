var loging = Ti.UI.createView({
	backgroundColor:'#CCC',
	opacity:0.5,
});
var loading = Titanium.UI.createActivityIndicator({
    message:L('Registrando...'),
    style:Titanium.UI.iPhone.ActivityIndicatorStyle.DARK,
    top:'50%'
});

if (!user.value || !pass.value || !repeatPass.value || !name.value || !email.value) {
	var confirm = Ti.UI.createAlertDialog({
		title:L('Error'),
		message:L('Faltan campos por rellenar'),
		ok:L('Ok')
	});
	confirm.show();
} else {
	loging.add(loading);
	loading.show();
	win.add(loging);
	var error = '';
	var path = Ti.App.dataURL + 'register.php';
	var client = Ti.Network.createHTTPClient({
		onload: function(e) {
			Ti.API.info('success ' + this.responseText);
			var result = eval('(' + this.responseText + ')');
			if (result['status'] == 'ok') {
				Ti.App.Properties.setString('login', result['id']);
				Ti.App.Properties.setString('user', user.value);
				Ti.App.Properties.setString('token', result['token']);
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
		pass:pass.value,
		repeatPass:repeatPass.value,
		name:name.value,
		email:email.value
	});
}
	
function close() {
	win.close({transition:Ti.UI.iPhone.AnimationStyle.NONE});
	win.parentWin.close();
}
