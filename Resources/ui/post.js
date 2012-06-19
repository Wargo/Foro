var win = Ti.UI.currentWindow;
var page = 1;
var lastPage = 1;
var margin = 7;

var reply = Ti.UI.createButton({
	title:L('Responder')
});

win.rightNavButton = reply;

reply.addEventListener('click', function() {
	if (Ti.App.Properties.getString('login')) {
		var createPost = Ti.UI.createWindow({
			url:'new_post.js',
			barColor:'#429BDA',
			title:L('Responder')
		});
	} else {
		var createPost = Ti.UI.createWindow({
			url:'login.js',
			barColor:'#429BDA',
			title:L('Login')
		});
	}
	
	createPost.topic_id = win.current.id;
	
	var nav = Ti.UI.iPhone.createNavigationGroup({
		window:createPost
	});
	var root = Ti.UI.createWindow();
	root.add(nav);
	root.open({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
	createPost.root = root;
	createPost.nav = nav;
});

var tableView = Ti.UI.createTableView({
	backgroundColor: '#DDD',
	bottom:40
});

var loading = Titanium.UI.createActivityIndicator({
    message:'',
    style:Titanium.UI.iPhone.ActivityIndicatorStyle.DARK,
    top:'50%'
});

win.add(loading);
loading.show();

var tableData = [];

var title = Ti.UI.createLabel({
	text:win.title,
	top:5,left:5,right:5,
	textAlign:'center',
	color:'#429BDA',
	font:{fontWeight:'bold'}
});
var rowTitle = Ti.UI.createTableViewRow({
	backgroundColor:'#EEE',
	bottom:5,
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
});
rowTitle.add(title);
tableData.push(rowTitle);

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
