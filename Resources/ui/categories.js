var win = Ti.UI.currentWindow;

var view = Ti.UI.createScrollView({
	backgroundColor: '#DDD',
	layout: 'vertical',
	contentHeight:'auto',
	showVerticalScrollIndicator: true
});

var loading = Titanium.UI.createActivityIndicator({
    message:'',
    style:Titanium.UI.iPhone.ActivityIndicatorStyle.DARK,
    top:'50%'
});

view.add(loading);
loading.show();

Ti.include('/forums.js');

var interval = setInterval(function() {
	if (data) {
		for (i in data) {
			url = 'subcategories.js';
			Ti.include('/ui/elements/category.js');
		}
		clearInterval(interval);
		loading.hide();
		view.remove(loading);
	}
	if (error) {
		alert(error);
		clearInterval(interval);
		loading.hide();
		view.remove(loading);
	}
}, 100);

win.add(view);