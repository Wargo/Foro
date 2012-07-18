var win = Ti.UI.currentWindow;
var page = 1;

//win.addEventListener('focus', function() {
	var help = require('help');
	help(L('Modificar mis foros'));
//});

var tableView = Ti.UI.createTableView({
	backgroundColor: '#DDD'
});

var edit = Ti.UI.createButton({
	title:L('Editar')
});
var cancel = Titanium.UI.createButton({
	title:L('Cancelar'),
	style:Titanium.UI.iPhone.SystemButtonStyle.DONE
});

win.rightNavButton = edit;
edit.addEventListener('click', function() {
	win.rightNavButton = cancel;
	tableView.editing = true;
});
cancel.addEventListener('click', function() {
	win.rightNavButton = edit;
	tableView.editing = false;
});

tableView.editable = true;

tableView.addEventListener('delete', function(e) {
	var favorites = Ti.App.Properties.getList('favorites', []);
	while (favorites.indexOf(e.row.content.id) !== -1) {
		favorites.splice(favorites.indexOf(e.row.content.id), 1);
	}
	Ti.App.Properties.setList('favorites', favorites);
});

var loading = Titanium.UI.createActivityIndicator({
    message:'',
    style:Titanium.UI.iPhone.ActivityIndicatorStyle.DARK,
    top:'50%'
});

win.add(loading);
loading.show();
var tableData = [];

var url = 'posts.js';
var element = '/ui/elements/category.js';
//var id = win.current.id;
var loadFrom = '/favorites.js'
Ti.include(loadFrom);

var interval = setInterval(function() {
	if (data) {
		for (i in data) {
			Ti.include(element);
		}
		clearInterval(interval);
		loading.hide();
		tableView.data = tableData;
		win.add(tableView);
	}
	if (error) {
		var confirm = Ti.UI.createAlertDialog({
			title:L('Error'),
			message:error,
			ok:L('Ok')
		});
		confirm.show();
		clearInterval(interval);
		loading.hide();
		win.remove(loading);
		win.add(tableView);
	}
}, 100);

Ti.include('/ui/reload.js');
Ti.include('/ui/append.js');