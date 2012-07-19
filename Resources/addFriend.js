function add_friend(id) {
	var path = Ti.App.dataURL + 'addFriend.php';
	var client = Ti.Network.createHTTPClient({
		onload: function(e) {
			Ti.API.info('success ' + this.responseText);
			var result = eval('(' + this.responseText + ')');
			if (result.status == 'ok') {
				if (result.data == 1) {
					addFriend.enabled = false;
					text1.text = L('Solicitud de amistad enviada');
					icon1.image = 'images/addFriend2.png';
				} else if (result.data == 2) {
					win.rightNavButton = newMessage;
				}
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
		userId:Ti.App.Properties.getString('login'),
		token:Ti.App.Properties.getString('token'),
		toUserId:id
	});
}