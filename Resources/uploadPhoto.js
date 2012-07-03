function upload(e) {
	var ind = Ti.UI.createProgressBar({
		width:200,
		height:50,
		min:0,
		max:1,
		value:0,
		style:Titanium.UI.iPhone.ProgressBarStyle.PLAIN,
		top:20,
		message:L('Subiendo imagen...'),
		font:{fontSize:12, fontWeight:'bold'},
		color:'#888'
	});
	var backgroundLoader = Ti.UI.createView({
		backgroundColor:'#FFF',
		opacity:0.7
	})
	
	win.add(backgroundLoader);
	win.add(ind);
	ind.show();
	
	var path = Ti.App.dataURL + 'uploadPhoto.php';
	var client = Ti.Network.createHTTPClient({
		onload: function() {
			Ti.API.info('success ' + this.responseText);
			var result = eval('(' + this.responseText + ')');
			if (result['status'] == 'ok') {
				image.image = result['thumb'];
				image.big = result['image'];
			} else {
				var error = Ti.UI.createAlertDialog({
					title:L('Error'),
					message:result['message'],
					ok:L('Ok')
				});
				error.show();
			}
			setTimeout(function() {
				ind.hide();
				win.remove(backgroundLoader);
			}, 1000)
		},
		onerror: function() {
			var error = Ti.UI.createAlertDialog({
				title:L('Error'),
				message:L('Ha ocurrido un error con la conexión'),
				ok:L('Ok')
			});
			error.show();
		},
		onsendstream: function(e2) {
			ind.value = e2.progress;
		},
		timeout: 15000
	});
	client.open('POST', path);
	client.send({
		//square:e.cropRect,
		//thumb:e.thumbnail,
		file:e.media,
		user:Ti.App.Properties.getString('login'),
		token:Ti.App.Properties.getString('token')
	});
}