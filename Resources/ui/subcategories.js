var win = Ti.UI.currentWindow;
var page = 1;

var tableView = Ti.UI.createTableView({
	backgroundColor: '#DDD'
});

var editing = false;

var edit = Ti.UI.createButton({
	title:L('Favoritos')
	//style:Ti.UI.iPhone.SystemIcon.FAVORITES
});
var cancel = Titanium.UI.createButton({
	title:L('Guardar'),
	style:Titanium.UI.iPhone.SystemButtonStyle.DONE
});

if (win.current.id != -1) {
	win.rightNavButton = edit;
}

edit.addEventListener('click', function() {
	editing = true;
	startAddToFav(false);
	win.rightNavButton = cancel;
});

function startAddToFav(animated) {
	for (i in tableView.data[0].rows) {
		var row = tableView.data[0].rows[i];
		
		if (typeof row.addMe != 'undefined' && row.addMe.opacity == '1') {
			continue;
		}
		
		var addMe = Ti.UI.createLabel({
			backgroundImage:'images/off.png',
			width:32,
			height:32,
			left:-25,
			opacity:0
		});
		addMe.id = row.content.id;
		if (Ti.App.inArray(row.content.id, Ti.App.Properties.getList('favorites', []))) {
			addMe.backgroundImage = 'images/on.png';
		}
		row.add(addMe);
		row.addMe = addMe;
		var animation1 = Ti.UI.createAnimation({
			left: 10,
			duration:300,
			opacity:1
		});
		var animation2 = Ti.UI.createAnimation({
			left: 50,
			duration:300
		});
		if (animated) {
			row.addMe.animation = animation1;
			row.content.title.animation = animation2;
		} else {
			row.addMe.left = 10;
			row.addMe.opacity = 1;
			row.content.title.left = 50;
		}
		
		addMe.addEventListener('click', function(e) {
			var favorites = Ti.App.Properties.getList('favorites', []);
			if (!Ti.App.inArray(e.source.id, Ti.App.Properties.getList('favorites', []))) {
				favorites.push(e.source.id);
				Ti.App.Properties.setList('favorites', favorites);
				e.source.backgroundImage = 'images/on.png';
			} else {
				while (favorites.indexOf(e.source.id) !== -1) {
					favorites.splice(favorites.indexOf(e.source.id), 1);
				}
				Ti.App.Properties.setList('favorites', favorites);
				e.source.backgroundImage = 'images/off.png';
			}
			Ti.API.info(favorites);
		})
	}
}

cancel.addEventListener('click', function() {
	editing = false;
	endAddToFav(false);
	win.rightNavButton = edit;
});

function endAddToFav(animated) {
	for (i in tableView.data[0].rows) {
		var row = tableView.data[0].rows[i];
		var animation1 = Ti.UI.createAnimation({
			left: -25,
			duration:300,
			opacity:0
		});
		var animation2 = Ti.UI.createAnimation({
			left: 15,
			duration:300
		});
		if (animated) {
			row.addMe.animation = animation1;
			row.content.title.animation = animation2;
		} else {
			if (typeof row.addMe != 'undefined') {
				row.addMe.left = -25;
				row.addMe.opacity = 0;
				row.content.title.left = 15;
			}
		}
		setTimeout("row.remove(row.addMe)", 300);
	}
}

var loading = Titanium.UI.createActivityIndicator({
    message:'',
    style:Titanium.UI.iPhone.ActivityIndicatorStyle.DARK,
    top:'50%'
});

win.add(loading);
loading.show();
var tableData = [];

var url = 'posts.js';
var element = '/ui/elements/category.js';
var id = win.current.id;
var loadFrom = '/subforums.js'

if (id == -1) {
	loadFrom = '/photo_folders.js';
	url = 'photos.js'
}

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
		win.add(tableView);
	}
	if (error) {
		alert(error);
		clearInterval(interval);
		loading.hide();
		win.remove(loading);
		win.add(tableView);
	}
}, 100);

Ti.include('/ui/reload.js');
Ti.include('/ui/append.js');