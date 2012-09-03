var win = Ti.UI.currentWindow;
win.title = L('Amigas');
win.barColor = '#429BDA';
win.backgroundColor = '#FFF';
var page = 1;

var help = require('help');
help(L('Añadir más amigas'), win);

var search = Ti.UI.createButton({
	systemButton:Ti.UI.iPhone.SystemButton.ADD
});
win.rightNavButton = search;

search.addEventListener('click', function() {
	Ti.UI.currentTab.open(Ti.UI.createWindow({url:'search.js'}));
});

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

var element = '/ui/elements/friend.js'

var loadFrom = '/friends.js';
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