var data = '';
var error = '';
var path = 'http://www.servidordeprueba.net/webs/foro/posts.php';
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

client.open('POST', path);
client.send({
	id:id
});