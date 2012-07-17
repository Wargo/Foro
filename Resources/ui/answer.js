var win = Ti.UI.currentWindow;
var cancelButton = Ti.UI.createButton({
	title:L('Cancelar')
});
var saveButton = Ti.UI.createButton({
	title:L('Enviar')
});

win.rightNavButton = saveButton;
win.leftNavButton = cancelButton;

cancelButton.addEventListener('click', function() {
	win.root.close({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
});
saveButton.addEventListener('click', function() {
	if (text.value == '') {
		var confirm = Ti.UI.createAlertDialog({
			title:L('Error'),
			message:L('Debes rellenar el mensaje'),
			ok:L('Ok')
		});
		confirm.show();
		return false;
	}
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
	saveButton.enabled = false;
	var path = Ti.App.dataURL + 'create_message.php';
	var client = Ti.Network.createHTTPClient({
		onload: function(e) {
			Ti.API.info('success ' + this.responseText);
			var result = eval('(' + this.responseText + ')');
			if (!result || result.status != 'ok') {
				alert(result.message);
				loading.hide();
				win.remove(loging);
				saveButton.enabled = true;
			} else {
				if (typeof win.beginReloading != 'undefined') {
					win.beginReloading();
				}
				win.root.close({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
			}
		},
		onerror: function(e) {
			alert(L('Ha ocurrido un error con la conexión'));
			Ti.API.info('error');
			saveButton.enabled = true;
		},
		timeout: 15000
	});
	
	client.open('POST', path);
	if (typeof win.thread_id != 'undefined') {
		client.send({
			thread_id:win.thread_id,
			message:text.value,
			userId:Ti.App.Properties.getString('login'),
			token:Ti.App.Properties.getString('token')
		});
	} else {
		client.send({
			subject:title.value,
			message:text.value,
			toUserId:win.user_id, // TODO esto no está terminado
			userId:Ti.App.Properties.getString('login'),
			token:Ti.App.Properties.getString('token')
		});
	}
});

var view = Ti.UI.createView({
	backgroundColor:'#FFF',
	layout:'vertical'
});

var title = Ti.UI.createTextField({
	hintText: L('Título'),
	top:20,
	left:15,right:15,
	backgroundColor:'#FFF',
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

var text = Ti.UI.createTextArea({
	value: L('Texto'),
	color:'#AAA',
	top:20,
	height:'40%',
	left:15,right:15,
	font:{fontSize:14},
	backgroundColor:'#FFF',
	borderRadius: 3,
	borderColor:'#999',
	suppressReturn:false,
});

if (typeof win.thread_id == 'undefined') {
	text.height = '30%';
}

text._hintText = text.value;

text.addEventListener('focus', function(e) {
	if (e.source.value == e.source._hintText) {
		e.source.value = '';
		e.source.color = '#000';
	}
});
text.addEventListener('blur', function(e){
    if(e.source.value == ''){
        e.source.value = e.source._hintText;
		e.source.color = '#AAA';
    }
});

setTimeout(function() {
	if (!win.thread_id) {
		title.focus();
	} else {
		text.focus();
	}
}, 300)

if (!win.thread_id) {
	view.add(title);
}

view.add(text);

win.add(view);
