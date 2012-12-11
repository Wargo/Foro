var win = Ti.UI.currentWindow;
var page = 1;
var lastPage = 1;
var margin = 7;

if (win.messages) {
	var help = require('help');
	help(L('Responder a este mensaje'), win);
} else {
	var help = require('help');
	help(L('Responder a este post'), win);
}

/*
var ad = Ti.UI.iOS.createAdView({
	bottom:-200,
	zIndex:100,
	height:Ti.UI.SIZE,
	width:Ti.UI.SIZE
});
*/

var getAd = require('ui/elements/ad');

var ad = getAd({
	bottom: -200,// left: 0,
	width: 320, height: 50,
	publisherId: 'a150c6fd31e0758', // You can get your own at http: //www.admob.com/
	//adBackgroundColor: 'black',
	testing: false,
	//dateOfBirth: new Date(1985, 10, 1, 12, 1, 1),
	gender: 'female',
	//location: COORDS,
	keywords: 'bebe, embarao, embarazada, foro, niño, madre, padre, hijo',
	zIndex:999
});

var reply = Ti.UI.createButton({
	systemButton:Ti.UI.iPhone.SystemButton.REPLY
});

if (win.current.open == 0) {
	reply.title = L('Cerrado');
	reply.enabled = false;
}
win.rightNavButton = reply;

reply.addEventListener('click', function() {
	if (Ti.App.Properties.getString('login')) {
		if (typeof win.messages != 'undefined' && win.messages == true) {
			var createPost = Ti.UI.createWindow({
				url:'answer.js',
				barColor:'#429BDA',
				title:L('Responder')
			});
			createPost.thread_id = win.current.id;
		} else {
			var createPost = Ti.UI.createWindow({
				url:'new_post.js',
				barColor:'#429BDA',
				title:L('Responder')
			});
			createPost.topic_id = win.current.id;
		}
	} else {
		var createPost = Ti.UI.createWindow({
			url:'login.js',
			barColor:'#429BDA',
			title:L('Login')
		});
	}
	
	createPost.beginReloading = beginReloading;
	
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
	font:{fontWeight:'bold'},
	shadowColor:"#CCC",
	shadowOffset:{x:1,y:1}
});
var rowTitle = Ti.UI.createTableViewRow({
	backgroundColor:'#EEE',
	bottom:5,
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
});
rowTitle.add(title);
tableData.push(rowTitle);
//tableView.appendRow(rowTitle)

var element = '/ui/elements/post.js'
var id = win.current.id;
if (win.messages) {
	var loadFrom = '/message.js';
} else {
	var loadFrom = '/post.js';
}

Ti.include(loadFrom);

var interval = setInterval(function() {
	if (data) {
		for (i in data) {
			Ti.include(element);
		}
		clearInterval(interval);
		tableView.data = tableData;
		Ti.include('/ui/paginator.js');
		win.add(tableView);
		//ad.addEventListener('load', function() {
		ad.addEventListener('didReceiveAd', function() {
			ad.animate({bottom:40, duration:300});
			tableView.animate({bottom:95, duration:300});
		});
		//ad.addEventListener('error', function() {
		ad.addEventListener('didFailedReceiveAd', function() {
			ad.animate({bottom:-200, duration:300});
			tableView.animate({bottom:40, duration:300});
		});
		win.add(ad);
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
Ti.include('/notifications.js');
