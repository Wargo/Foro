var data = '';
var error = '';
var path = Ti.App.dataURL + 'photos.php';
var client = Ti.Network.createHTTPClient({
	onload: function(e) {
		Ti.API.info('success ' + this.responseText);
		var result = eval('('+ this.responseText + ')');
		if (result['status'] == 'ok') {
			data = result['data'];
		} else {
			alert(result['message']);
		}
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