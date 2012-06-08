var win = Ti.UI.currentWindow;

var createPost = Ti.UI.createButton({
	title:L('+')
});

win.rightNavButton = createPost;

createPost.addEventListener('click', function() {
	if (Ti.App.Properties.getString('login', null)) {
		var createPost = Ti.UI.createWindow({
			url:'new_post.js',
			barColor:'#429BDA',
			title:L('Nuevo post')
		});
	} else {
		var createPost = Ti.UI.createWindow({
			url:'login.js',
			barColor:'#429BDA',
			title:L('Login')
		});
	}
	
	var nav = Ti.UI.iPhone.createNavigationGroup({
		window:createPost
	});
	
	var root = Ti.UI.createWindow();
	root.add(nav);
	root.open({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
	createPost.root = root;
	createPost.nav = nav;
})

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