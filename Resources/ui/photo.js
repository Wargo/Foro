var win = Ti.UI.currentWindow;
var page = 1;
var lastPage = 1;
var margin = 7;

var help = require('help');
help(L('Comentar esta foto'), win);

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

/*
if (win.current.open == 0) {
	reply.title = L('Cerrado');
	reply.enabled = false;
}
*/
win.rightNavButton = reply;

reply.addEventListener('click', function() {
	if (Ti.App.Properties.getString('login')) {
		var createPost = Ti.UI.createWindow({
			url:'new_comment.js',
			barColor:'#429BDA',
			title:L('Comentar')
		});
	} else {
		var createPost = Ti.UI.createWindow({
			url:'login.js',
			barColor:'#429BDA',
			title:L('Login')
		});
	}
	
	createPost.photo_id = win.current.id;
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

var image = Ti.UI.createImageView({
	image:win.current.image,
	defaultImage:'images/clock.png',
	top:15,
	height:275,
	width:275
});
image.imageBig = win.current.imageBig;

var hiddenImage = Ti.UI.createImageView({
	image:win.current.imageBig,
	height:1,
	width:1
});
var tit = Ti.UI.createLabel({text:win.current.title});
var usernameLabel = Ti.UI.createLabel({text:win.current.usernameLabel});
var numComments = Ti.UI.createLabel({text:win.current.numComments});
var icoComments = Ti.UI.createImageView({image:win.current.icoComments});
var dateLabel = Ti.UI.createLabel({text:win.current.dateLabel});

tit.top = 295;
tit.right = 50;
tit.left = 20;
tit.width = 230;
tit.height = 40;
usernameLabel.width = 200;
usernameLabel.top = 340;
usernameLabel.left = 20;
numComments.top = 310;
numComments.right = 35;
icoComments.top = 312;
icoComments.right = 15;
icoComments.width = 15;
icoComments.height = 15;
dateLabel.color = numComments.color = usernameLabel.color = '#666';
dateLabel.font = numComments.font = usernameLabel.font = {fontSize:14};
tit.font = {fontSize:15};
tit.color = '#55ACFF';
dateLabel.top = 340;
dateLabel.right = 15;

var rowImage = Ti.UI.createTableViewRow({
	backgroundColor:'#EEE',
	bottom:5,
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
});
rowImage.add(hiddenImage);
rowImage.add(image);
rowImage.add(tit);
rowImage.add(numComments);
rowImage.add(icoComments);
rowImage.add(dateLabel);
rowImage.add(usernameLabel);
tableData.push(rowImage);
tableView.appendRow(rowImage);

image.addEventListener('click', function(e) {
	var imageUrl = e.source.imageBig;
	
	var imageBigWin = Ti.UI.createWindow({
		title:L('Foto'),
		backgroundColor:'#000',
		barColor:'#429BDA'
	});
	
	var imageScrollView = Ti.UI.createScrollView({
		contentWidth: 'auto',
	    contentHeight: 'auto',
	    top: 0,
	    bottom: 0,
	    showVerticalScrollIndicator: false,
	    showHorizontalScrollIndicator: false,
	    maxZoomScale: 10,
	    minZoomScale: 1,
	    zoomScale: 1
	});
	
	var imageBig = Ti.UI.createImageView({
		image:imageUrl,
		defaultImage:'images/clock.png',
		width:'100%',
		height:'100%'
	});
	
	imageScrollView.add(imageBig);
	imageBigWin.add(imageScrollView);
	
	Ti.UI.currentTab.open(imageBigWin);
});

var element = '/ui/elements/post.js'
var id = win.current.id;
var loadFrom = '/comments.js';
Ti.include(loadFrom);

var interval = setInterval(function() {
	if (data) {
		for (i in data) {
			Ti.include(element);
		}
		clearInterval(interval);
		loading.hide();
		tableView.data = tableData;
		if (data.length > 0) {
			Ti.include('/ui/paginator.js');
		} else {
			tableView.bottom = 0;
		}
		win.add(tableView);
		//ad.addEventListener('load', function() {
		ad.addEventListener('didReceiveAd', function() {
			if (data.length > 0) {
				ad.animate({bottom:40, duration:300});
				tableView.animate({bottom:90, duration:300});
			} else {
				ad.animate({bottom:0, duration:300});
				tableView.animate({bottom:50, duration:300});
			}
		});
		//ad.addEventListener('error', function() {
		ad.addEventListener('didFailedReceiveAd', function() {
			if (data.length > 0) {
				ad.animate({bottom:-200, duration:300});
				tableView.animate({bottom:40, duration:300});
			} else {
				ad.animate({bottom:0, duration:300});
				tableView.animate({bottom:0, duration:300});
			}
		})
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
