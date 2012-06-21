var win = Ti.UI.currentWindow;
var page = 1;

var tableView = Ti.UI.createTableView({
	backgroundColor: '#DDD'
});

var edit = Ti.UI.createButton({
	title:L('Favoritos')
});
var cancel = Titanium.UI.createButton({
	title:L('Guardar'),
	style:Titanium.UI.iPhone.SystemButtonStyle.DONE
});

//tableView.editable = true;
win.rightNavButton = edit;
edit.addEventListener('click', function() {
	win.rightNavButton = cancel;
	for (row in tableData) {
		var addMe = Ti.UI.createImageView({
			image:'images/off.png',
			left:-25,
			opacity:0
		});
		addMe.id = tableData[row].content.id;
		if (Ti.App.inArray(tableData[row].content.id, Ti.App.Properties.getList('favorites', []))) {
			addMe.image = 'images/on.png';
		}
		tableData[row].add(addMe);
		tableData[row].addMe = addMe;
		//tableData[row].content.title.left = 50,
		var animation1 = Ti.UI.createAnimation({
			left: 10,
			duration:300,
			opacity:1
		});
		var animation2 = Ti.UI.createAnimation({
			left: 50,
			duration:300
		});
		tableData[row].addMe.animation = animation1;
		tableData[row].content.title.animation = animation2;
		
		addMe.addEventListener('click', function(e) {
			var favorites = Ti.App.Properties.getList('favorites', []);
			if (!Ti.App.inArray(e.source.id, Ti.App.Properties.getList('favorites', []))) {
				favorites.push(e.source.id);
				Ti.App.Properties.setList('favorites', favorites);
				e.source.image = 'images/on.png';
			} else {
				while (favorites.indexOf(e.source.id) !== -1) {
					favorites.splice(favorites.indexOf(e.source.id), 1);
				}
				Ti.App.Properties.setList('favorites', favorites);
				e.source.image = 'images/off.png';
			}
			Ti.API.info(favorites);
		})
	}
	//tableView.editing = true;
});
cancel.addEventListener('click', function() {
	win.rightNavButton = edit;
	for (row in tableData) {
		//tableData[row].content.title.left = 15;
		var animation1 = Ti.UI.createAnimation({
			left: -25,
			duration:300,
			opacity:0
		});
		var animation2 = Ti.UI.createAnimation({
			left: 15,
			duration:300
		});
		tableData[row].addMe.animation = animation1;
		tableData[row].content.title.animation = animation2;
		setTimeout(function() {
			tableData[row].remove(tableData[row].addMe);
		},300)
	}
	//tableView.editing = false;
});



/*
var favorites = Ti.App.Properties.getList('favorites', []);
favorites.push(win.current.id);
Ti.App.Properties.setList('favorites', favorites);
*/
	
	

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