var data = '';
var error = '';
var path = Ti.App.dataURL + 'comments.php';
var client = Ti.Network.createHTTPClient({
	onload: function(e) {
		Ti.API.info('success ' + this.responseText);
		data = eval('(' + this.responseText + ')');
		lastPage = data.lastPage;
		data = data.data;
	},
	onerror: function(e) {
		error = L('Ha ocurrido un error con la conexión');
		Ti.API.info('error');
	},
	timeout: 15000
});

client.open('POST', path);
client.send({
	id:id,
	page:page
});