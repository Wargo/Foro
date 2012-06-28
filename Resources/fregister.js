var error = '';
var path = Ti.App.dataURL + 'fregister.php';
var client = Ti.Network.createHTTPClient({
	onload: function(e) {
		Ti.API.info('success ' + this.responseText);
		var result = eval('(' + this.responseText + ')');
		
		if (result['status'] == 'ok') {
			Ti.App.Properties.setString('login', result['login']);
			Ti.App.Properties.setString('user', result['username']);
			close();
		} else {
			alert(L('Ha ocurrido un error en el registro'));
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
	email:facebookData['email'],
	birthday:facebookData['birthday'],
	location:facebookData['hometown']['name'],
	first_name:facebookData['first_name'],
	last_name:facebookData['last_name'],
	login:fLogin.value,
	pass:fPass.value
});
