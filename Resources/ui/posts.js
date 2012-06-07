var win = Ti.UI.currentWindow;

var createPost = Ti.UI.createButton({
	title:L('+')
});

win.rightNavButton = createPost;

var view = Ti.UI.createScrollView({
	backgroundColor: '#DDD',
	layout: 'vertical',
	contentHeight:'auto',
	showVerticalScrollIndicator: true
});

Ti.include('/data.js');

for (i in data) {
	Ti.include('/ui/elements/post_row.js');
}

win.add(view);