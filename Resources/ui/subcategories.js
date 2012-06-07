var win = Ti.UI.currentWindow;

var view = Ti.UI.createScrollView({
	backgroundColor: '#DDD',
	layout: 'vertical',
	contentHeight:'auto',
	showVerticalScrollIndicator: true
});

Ti.include('/data.js');

for (i in data) {
	url = 'posts.js';
	Ti.include('/ui/elements/category.js');
}

win.add(view);