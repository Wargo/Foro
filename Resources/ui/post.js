var win = Ti.UI.currentWindow;
var page = 1;
var lastPage = 1;
var margin = 7;

var reply = Ti.UI.createButton({
	title:L('<-')
});

win.rightNavButton = reply;

var tableView = Ti.UI.createTableView({
	backgroundColor: '#DDD',
	top:35
});

var loading = Titanium.UI.createActivityIndicator({
    message:'',
    style:Titanium.UI.iPhone.ActivityIndicatorStyle.DARK,
    top:'50%'
});

win.add(loading);
loading.show();
var tableData = [];

var element = '/ui/elements/post.js'
var id = win.current.id;
var loadFrom = '/post.js';
Ti.include(loadFrom);

var interval = setInterval(function() {
	if (data) {
		for (i in data) {
			Ti.include(element);
		}
		clearInterval(interval);
		loading.hide();
		//win.remove(loading);
		tableView.data = tableData;
		Ti.include('/ui/paginator.js');
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
//Ti.include('/ui/append.js');
