if (Ti.App.Properties.getString('login', null)) {
	var path = Ti.App.dataURL + 'unread.php';
	var client = Ti.Network.createHTTPClient({
		onload: function(e) {
			Ti.API.info('success ' + this.responseText);
			var badges = eval('(' + this.responseText + ')');
			Ti.App.tab5.setBadge(badges.num);
			Titanium.UI.iPhone.appBadge = badges.num;
		},
		onerror: function(e) {
			error = L('Ha ocurrido un error con la conexión');
			Ti.API.info('error');
		},
		timeout: 15000
	});
	
	client.open('POST', path);
	client.send({
		user_id:Ti.App.Properties.getString('login', null)
	});
}
