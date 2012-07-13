function markAsRead(thread_id) {
	var path = Ti.App.dataURL + 'mark_as_read.php';
	var client = Ti.Network.createHTTPClient({
		onload: function(e) {
			Ti.include('/notifications.js');
		},
		onerror: function(e) {
			error = L('Ha ocurrido un error con la conexión');
			Ti.API.info('error');
		},
		timeout: 15000
	});
	
	client.open('POST', path);
	client.send({
		user_id:Ti.App.Properties.getString('login', null),
		token:Ti.App.Properties.getString('token', null),
		thread_id:thread_id
	});
}