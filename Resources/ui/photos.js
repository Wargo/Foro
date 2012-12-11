var win = Ti.UI.currentWindow;
var page = 1;

var help = require('help');
help(L('Insertar una nueva foto'), win);

var createPost = Ti.UI.createButton({
	systemButton:Ti.UI.iPhone.SystemButton.COMPOSE
});
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
win.rightNavButton = createPost;

createPost.addEventListener('click', function() {
	if (Ti.App.Properties.getString('login')) {
		var createPost = Ti.UI.createWindow({
			url:'new_photo.js',
			barColor:'#429BDA',
			title:L('Nueva foto')
		});
	} else {
		var createPost = Ti.UI.createWindow({
			url:'login.js',
			barColor:'#429BDA',
			title:L('Login')
		});
	}
	
	createPost.folder_id = win.current.id;
	//createPost.beginReloading = beginReloading;
	
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
	backgroundColor: '#DDD'
});

/*
var tableView = Ti.UI.createScrollView({
	contentHeight:'auto',
	showVerticalScrollIndicator:true
});
*/
var loading = Titanium.UI.createActivityIndicator({
    message:'',
    style:Titanium.UI.iPhone.ActivityIndicatorStyle.DARK,
    top:'50%'
});

win.add(loading);
loading.show();
var tableData = [];

var element = '/ui/elements/photo_row.js'
var id = win.current.id;

var loadFrom = '/photos.js';
Ti.include(loadFrom);

var h = 0;
var x = 0;
var size = 100;
var cols = 3;
var space = 5;
if (Ti.Platform.osname == 'ipad') {
	cols = 5;
}

if (Ti.Platform.osname == 'ipad') {
	Ti.Gesture.addEventListener('orientationchange', function(e) {
		if (e.orientation == 1 || e.orientation == 2 || e.orientation == 3 || e.orientation == 4) {
			beginReloading();
		}
		/*
		size = Math.round((Titanium.Platform.displayCaps.platformWidth - ((cols + 1) * space)) / cols);
		for (x in tableData) {
			son = tableData[x];
		    for (i = 0; i < son.children.length; i++){
		        if (e.orientation == 1 || e.orientation == 2) {
		        	son.children[i]._content.top = 100;
		        	son.children[i].width = size;
	        		son.children[i].height = size;
		        } else if (e.orientation == 3 || e.orientation == 4){
		        	son.children[i]._content.top = 160;
		        	son.children[i].width = size;
	        		son.children[i].height = size;
		        }
		    };
		}
		*/
	});
}

var interval = setInterval(function() {
	if (data) {
		for (i in data) {
			Ti.include(element);
		}
		clearInterval(interval);
		loading.hide();
		tableView.data = tableData;
		win.add(tableView);
		//ad.addEventListener('load', function() {
		ad.addEventListener('didReceiveAd', function() {
			ad.animate({bottom:0, duration:300});
			tableView.animate({bottom:50, duration:300});
		});
		//ad.addEventListener('error', function() {
		ad.addEventListener('didFailedReceiveAd', function() {
			ad.animate({bottom:-200, duration:300});
			tableView.animate({bottom:0, duration:300});
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
Ti.include('/ui/append.js');
Ti.include('/notifications.js');
