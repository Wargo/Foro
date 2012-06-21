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
		alert(L('Debes rellenar el mensaje'));
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
	var path = Ti.App.dataURL + 'create_post.php';
	//var path = 'http://elembarazo.net/foro/bb-post.php'
	var client = Ti.Network.createHTTPClient({
		onload: function(e) {
			Ti.API.info('success ' + this.responseText);
			var result = eval('(' + this.responseText + ')');
			if (!result || result.status != 'ok') {
				alert(L('Error guardando el mensaje'));
			}
			loading.hide();
			win.remove(loging);
			win.root.close({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
		},
		onerror: function(e) {
			alert(L('Ha ocurrido un error con la conexión'));
			Ti.API.info('error');
		},
		timeout: 15000
	});
	
	client.open('POST', path);
	if (typeof win.topic_id != 'undefined') {
		client.send({
			topic_id:win.topic_id,
			post_content:text.value,
			user:Ti.App.Properties.getString('user'),
			pass:Ti.App.Properties.getString('pass'),
		});
	} else if (typeof win.forum_id != 'undefined') {
		client.send({
			forum_id:win.forum_id,
			topic:title.value,
			post_content:text.value,
			user:Ti.App.Properties.getString('user'),
			pass:Ti.App.Properties.getString('pass'),
		});
	} else {
		alert(L('Error enviando mensaje'));
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
	height:100,
	left:15,right:15,
	font:{fontSize:14},
	backgroundColor:'#FFF',
	borderRadius: 3,
	borderColor:'#999',
	suppressReturn:false,
});

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
	if (!win.topic_id) {
		title.focus();
	} else {
		text.focus();
	}
}, 300)

if (!win.topic_id) {
	view.add(title);
}

view.add(text);

win.add(view);
