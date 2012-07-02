			alert('estoy dentro')
			alert(e)
			var path = Ti.App.dataURL + 'uploadPhoto.php';
			var client = Ti.Network.createHTTPClient({
				onload: function() {
					Ti.API.info('success ' + this.responseText);
					var result = eval('(' + this.responseText + ')');
					if (result['status'] == 'ok') {
						image.image = result['thumb'];
						image.big = result['image'];
						setTimeout(function() {
							win.remove(loading);
						}, 1000);
					} else {
						alert(result['message']);
					}
				},
				onerror: function() {
					var error = Ti.UI.createAlertDialog({
						title:L('Error'),
						message:L('Ha ocurrido un error con la conexión'),
						ok:L('Ok')
					});
					error.show();
					win.remove(loading);
				},
				timeout: 15000
			});
			alert('larala')
			client.open('POST', path);
			alert('send ' + e.media);
			alert('send ' + e.thumbnail);
			client.send({
				//thumb:e.thumbnail,
				file:e.media,
				user:Ti.App.Properties.getString('login'),
				token:Ti.App.Properties.getString('token')
			});
			
			var loging = Ti.UI.createView({
				backgroundColor:'#CCC',
				opacity:0.7,
			});
			var loading = Titanium.UI.createActivityIndicator({
			    message:L('Enviando...'),
			    style:Titanium.UI.iPhone.ActivityIndicatorStyle.DARK,
			    top:60
			});
			win.add(loging);
			win.add(loading);
			loading.show();