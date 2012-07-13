var win = Ti.UI.currentWindow;
var page = 1;

win.backgroundColor = '#FFF';
if (win.folder == 'inbox') {
	win.title = L('Bandeja de entrada');
} else {
	win.title = L('Bandeja de salida');
}
win.barColor = '#429BDA';

var tableView = Ti.UI.createTableView({
	backgroundColor: '#DDD'
});

var loading = Titanium.UI.createActivityIndicator({
    message:'',
    style:Titanium.UI.iPhone.ActivityIndicatorStyle.DARK,
    top:'50%'
});

win.add(loading);
loading.show();
var tableData = [];

var element = '/ui/elements/post_row.js'

var loadFrom = '/messages.js';
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
		alert(error);
		clearInterval(interval);
		loading.hide();
		win.remove(loading);
	}
}, 100);

Ti.include('/ui/reload.js');
Ti.include('/ui/append.js');