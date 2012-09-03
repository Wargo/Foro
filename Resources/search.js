var data = '';
var path = Ti.App.dataURL + 'users.php';
var client = Ti.Network.createHTTPClient({
	onload: function(e) {
		tableData = [];
		Ti.API.info('success ' + this.responseText);
		var result = eval('(' + this.responseText + ')');
		if (result.status == 'ok') {
			data = result.data;
		} else {
			error = result.message;
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
	term:search.value,
	userId:Ti.App.Properties.getString('login'),
	page:page
});