var data = '';
var error = '';
var path = Ti.App.dataURL + 'forums.php';
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

client.open('GET', path);
client.send();