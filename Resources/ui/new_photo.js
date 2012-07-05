var win = Ti.UI.currentWindow;

var photo = '';
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
	title.blur();
	if (title.value == '' || photo == '') {
		var confirm = Ti.UI.createAlertDialog({
			title:L('Error'),
			message:L('Debes rellenar el título y seleccionar una foto'),
			ok:L('Ok')
		});
		confirm.show();
		return false;
	}
	
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
	
	var path = Ti.App.dataURL + 'create_photo.php';
	var client = Ti.Network.createHTTPClient({
		onload: function(e) {
			Ti.API.info('success ' + this.responseText);
			var result = eval('(' + this.responseText + ')');
			if (result.status != 'ok') {
				var error = Ti.UI.createAlertDialog({
					ok:L('Ok'),
					title:L('Error'),
					message:result.message
				});
				error.show();
			} else {
				win.beginReloading();
				win.root.close({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
			}
		},
		onerror: function(e) {
			alert(L('Ha ocurrido un error con la conexión'));
			Ti.API.info('error');
		},
		onsendstream: function(e2) {
			ind.value = e2.progress;
		},
		timeout: 15000
	});
	
	client.open('POST', path);
	client.send({
		folder_id:win.folder_id,
		title:title.value,
		photo:photo,
		userId:Ti.App.Properties.getString('login'),
		token:Ti.App.Properties.getString('token')
	});
});

var view = Ti.UI.createView({
	backgroundColor:'#FFF',
	//layout:'vertical'
});

var title = Ti.UI.createTextField({
	hintText: L('Título'),
	top:20,
	left:15,right:15,
	backgroundColor:'#FFF',
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

var icon = Ti.UI.createImageView({
	image:'images/photo.png',
	top:2,//left:20,//bottom:2
});
var text = Ti.UI.createLabel({
	text:L('Capturar foto'),
	textAlign:'right',
	color:'#CCC',
	font:{fontWeight:'bold',fontSize:18},
	//left:40
});
var takePhoto = Ti.UI.createView({
	borderColor:'#CCC',
	borderRadius:10,
	width:150,
	height:80,
	top:80,
	layout:'vertical'
});
takePhoto.add(icon);
takePhoto.add(text);

setTimeout(function() {
	title.focus();
}, 300)

if (!win.topic_id) {
	view.add(title);
}

view.add(takePhoto);

takePhoto.addEventListener('click', function() {
	title.blur();

	var dialog = Ti.UI.createOptionDialog({
		title: L('Elige de dónde quieres obtener la imagen'),
		options: [L('Cámara'), L('Galería'), L('Cancelar')],
		cancel:2
	});
	dialog.show();
	
	dialog.addEventListener('click', function(e) {
		if (e.index == 0) {
			camera();
		} else if (e.index == 1) {
			gallery();
		}
	});
});

function gallery() {
	Ti.Media.openPhotoGallery({
		mediaType:[Ti.Media.MEDIA_TYPE_PHOTO],
		success: function(e) {
			photo = e.media;
			success();
		},
		cancel: function() {
			
		},
		error: function(e) {
			var error = Ti.UI.createAlertDialog({
				ok:L('Ok'),
				title:L('Error'),
				message:L('Ha ocurrido un error con la galería')
			});
			error.show();
		},
		allowEditing:true
	})
}

function camera() {
	Ti.Media.showCamera({
		mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO],
		success: function(e) {
			photo = e.media;
			success();
		},
		cancel: function() {
			
		},
		error: function(e) {
			var error = Ti.UI.createAlertDialog({
				ok:L('Ok'),
				title:L('Error'),
				message:L('Ha ocurrido un error con la cámara')
			});
			error.show();
			//Ti.Media.hideCamera();
		},
		allowEditing:true,
		saveToPhotoGallery:true
	});
}

var preview = Ti.UI.createImageView({
	width:150,
	height:150,
	top:80,
	opacity:0
	//image:photo
});
view.add(preview);

var appear = Ti.UI.createAnimation({
	opacity: 1,
	duration: 300
});
var disappear = Ti.UI.createAnimation({
	opacity: 0,
	duration: 300
});

function success() {
	preview.animate(disappear);
	disappear.addEventListener('complete', function() {
		preview.image = photo;
		preview.animate(appear);
	});
	
	if (takePhoto != null) {
		view.remove(takePhoto);
		takePhoto = null;
	}
	
	preview.addEventListener('click', function() {
		title.blur();
		var dialog = Ti.UI.createOptionDialog({
			title: L('Elige de dónde quieres obtener la imagen'),
			options: [L('Cámara'), L('Galería'), L('Cancelar')],
			cancel:2
		});
		dialog.show();
		
		dialog.addEventListener('click', function(e) {
			if (e.index == 0) {
				camera();
			} else if (e.index == 1) {
				gallery();
			}
		});
	});
}

win.add(view);
