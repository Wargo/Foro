var fLogin = fPass = null;

if (!facebookData['email']) {
	alert(L('Ha ocurrido un error'));
} else {
	var error = '';
	var path = Ti.App.dataURL + 'flogin.php';
	var client = Ti.Network.createHTTPClient({
		onload: function(e) {
			Ti.API.info('success ' + this.responseText);
			var result = eval('(' + this.responseText + ')');
			if (result['status'] == 'ok') {
				Ti.App.Properties.setString('login', result['userId']);
				Ti.App.Properties.setString('user', result['username']);
				Ti.App.Properties.setString('token', result['token']);
				close();
			} else {
				var fRegister = Ti.UI.createView({
					top:10,left:10,bottom:10,right:10,
					opacity:0.8,
					backgroundColor:'#FFF',
					layout:'vertical'
				});
				fLogin = Ti.UI.createTextField({
					value:facebookData['first_name'].toLowerCase() + '_' + facebookData['last_name'].toLowerCase(),
					left:10,right:10,top:10,
					borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
					autocapitalization:Ti.UI.TEXT_AUTOCAPITALIZATION_NONE
				});
				fPass = Ti.UI.createTextField({
					hintText:L('Elige una contraseña'),
					left:10,right:10,top:10,
					borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
					autocapitalization:Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
					passwordMask:true
				});
				var fGo = Ti.UI.createButton({
					top:10,
					title:L('Registrarme')
				});
				errorMsg = Ti.UI.createLabel({
					text:'',
					color:'red',
					top:10
				});
				
				fRegister.add(fLogin);
				fRegister.add(fPass);
				fRegister.add(fGo);
				fRegister.add(errorMsg);
				win.add(fRegister);
				
				fGo.addEventListener('click', function() {
					Ti.include('/fregister.js');
				})
			}
		},
		onerror: function(e) {
			error = L('Ha ocurrido un error con la conexión');
			Ti.API.info('error');
			close();
		},
		timeout: 15000
	});
	
	client.open('POST', path);
	client.send({
		email:facebookData['email']
	});
}

function close() {
	if (typeof win.root != 'undefined') {
		win.root.close({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
	} else {
		win.switchPage(win.p);
		win.close();
	}
}
