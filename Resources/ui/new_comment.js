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
	var path = Ti.App.dataURL + 'create_comment.php';
	var client = Ti.Network.createHTTPClient({
		onload: function(e) {
			Ti.API.info('success ' + this.responseText);
			var result = eval('(' + this.responseText + ')');
			if (result.status != 'ok') {
				alert(result.message);
				loading.hide();
				win.remove(loging);
			} else {
				win.beginReloading();
				win.root.close({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
			}
		},
		onerror: function(e) {
			alert(L('Ha ocurrido un error con la conexión'));
			Ti.API.info('error');
		},
		timeout: 15000
	});
	
	client.open('POST', path);
	client.send({
		photo_id:win.photo_id,
		text:text.value,
		userId:Ti.App.Properties.getString('login'),
		token:Ti.App.Properties.getString('token')
	});
});

var view = Ti.UI.createView({
	backgroundColor:'#FFF',
	layout:'vertical'
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

if (typeof win.forum_id != 'undefined') {
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
	text.focus();
}, 300)

view.add(text);
win.add(view);
