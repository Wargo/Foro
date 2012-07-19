function is_friend(id) {
	var error = '';
	var ids = [];
	var petitions = [];
	var path = Ti.App.dataURL + 'friends_id.php';
	var client = Ti.Network.createHTTPClient({
		onload: function(e) {
			Ti.API.info('success ' + this.responseText);
			var result = eval('(' + this.responseText + ')');
			if (result.status == 'ok') {
				ids = result.friends;
				petitions = result.petitions;
				if (Ti.App.inArray(id, ids)) {
					win.rightNavButton = newMessage;
					var help = require('help');
					help(L('Enviar mensaje privado'));
					tableData.push(rowSendMessage);
				} else if (Ti.App.Properties.getString('login', null) != id) {
					win.rightNavButton = addFriend;
					var help = require('help');
					help(L('Enviar solicitud de amistad'));
					tableData.push(rowAddFriend);
				}
				view.data = tableData;
				
				if (Ti.App.inArray(id, petitions)) {
					addFriend.enabled = false;
					text1.text = L('Solicitud de amistad enviada');
					icon1.image = 'images/addFriend2.png';
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
		token:Ti.App.Properties.getString('token')
	});
}

is_friend(win.current.user_id);
