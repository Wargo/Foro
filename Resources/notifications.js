win.addEventListener('focus', function() {
	check_notifications();
});

function check_notifications() {
	if (Ti.App.Properties.getString('login', null)) {
		var path = Ti.App.dataURL + 'unread.php';
		var client = Ti.Network.createHTTPClient({
			onload: function(e) {
				Ti.API.info('success ' + this.responseText);
				var badges = eval('(' + this.responseText + ')');
				Ti.App.tab5.setBadge(badges.num);
				Titanium.UI.iPhone.appBadge = badges.num;
				if (typeof b != 'undefined') {
					if (Titanium.UI.iPhone.appBadge) {
						b.text = Ti.UI.iPhone.appBadge;
						c.add(b);
					} else {
						c.remove(b);
					}
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
			user_id:Ti.App.Properties.getString('login', null)
		});
	} else {
		Ti.App.tab5.setBadge(null);
		Titanium.UI.iPhone.appBadge = null;
		if (typeof b != 'undefined') {
			if (Titanium.UI.iPhone.appBadge) {
				b.text = Ti.UI.iPhone.appBadge;
				c.add(b);
			} else {
				c.remove(b);
			}
		}
	}
}
