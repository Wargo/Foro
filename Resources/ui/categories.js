var win = Ti.UI.currentWindow;
var page = 1;

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

var url = 'subcategories.js';
var element = '/ui/elements/category.js';
var loadFrom = '/forums.js';
Ti.include(loadFrom);

var interval = setInterval(function() {
	if (data) {
		for (i in data) {
			Ti.include(element);
		}
		clearInterval(interval);
		loading.hide();
		win.remove(loading);
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