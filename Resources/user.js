var userData = '';
var error = '';
var path = Ti.App.dataURL + 'user.php';
var client = Ti.Network.createHTTPClient({
	onload: function(e) {
		Ti.API.info('success ' + this.responseText);
		userData = eval('(' + this.responseText + ')');
	},
	onerror: function(e) {
		error = L('Ha ocurrido un error con la conexión');
		Ti.API.info('error');
	},
	timeout: 15000
});

client.open('POST', path);
client.send({
	id:Ti.App.Properties.getString('login')
});