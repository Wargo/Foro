var data = '';
var error = '';
var url = 'http://192.168.1.13/forums.php';
var client = Ti.Network.createHTTPClient({
	onload: function(e) {
		Ti.API.info('success');
		data = eval(this.responseText);
	},
	onerror: function(e) {
		error = L('Ha ocurrido un error con la conexión');
		Ti.API.info('error');
	},
	timeout: 5000
});

Ti.API.info('entro');

client.open('GET', url);
client.send();


/*
client.open('POST', url);
client.send({
	_save_email:email,
	_save_active:active,
	_save_user:user,
	_save_token:token,
	_save_date:date,
	_save_notifications:notifications
});
*/