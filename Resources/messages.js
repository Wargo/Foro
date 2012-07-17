var data = '';
var error = '';
var path = Ti.App.dataURL + 'messages.php';
var client = Ti.Network.createHTTPClient({
	onload: function(e) {
		Ti.API.info('success ' + this.responseText);
		data = eval(this.responseText);
	},
	onerror: function(e) {
		error = L('Ha ocurrido un error con la conexión');
		Ti.API.info('error');
	},
	timeout: 15000
});

client.open('POST', path);
client.send({
	folder:win.folder,
	page:page,
	userId:Ti.App.Properties.getString('login'),
	token:Ti.App.Properties.getString('token')
	//user_id:Ti.App.Properties.getString('login', null)
});