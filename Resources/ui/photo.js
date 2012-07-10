var win = Ti.UI.currentWindow;
var page = 1;
var lastPage = 1;
var margin = 7;

var ad = Ti.UI.iOS.createAdView({
	bottom:-200,
	zIndex:100,
	height:Ti.UI.SIZE,
	width:Ti.UI.SIZE
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
	image:win.current.image.image,
	defaultImage:'images/clock.png',
	top:15,
	height:275,
	width:275
});
var rowImage = Ti.UI.createTableViewRow({
	backgroundColor:'#EEE',
	bottom:5,
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
});
rowImage.add(image);
tableData.push(rowImage);
image.addEventListener('click', function(e) {
	var imageUrl = e.source.image;
	
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
		Ti.include('/ui/paginator.js');
		win.add(tableView);
		ad.addEventListener('load', function() {
			ad.animate({bottom:40, duration:300});
			tableView.animate({bottom:90, duration:300});
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
