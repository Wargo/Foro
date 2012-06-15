var paginate = Ti.UI.createView({
	height:40,
	backgroundColor:'#DDD',
	bottom:0
});

var first = Ti.UI.createLabel({
	text:L('Primera'),
	textAlign:'center',
	width:60,
	left:5,
	height:30,
	borderColor:'#429BDA',
	color:'#429BDA',
	borderRadius:5,
	backgroundColor:'#EEE',
	font:{fontSize:12},
});
var prev = Ti.UI.createLabel({
	text:L('Anterior'),
	textAlign:'center',
	width:60,
	left:70,
	height:30,
	borderColor:'#429BDA',
	color:'#429BDA',
	borderRadius:5,
	backgroundColor:'#EEE',
	font:{fontSize:12},
});
var next = Ti.UI.createLabel({
	text:L('Siguiente'),
	textAlign:'center',
	width:60,
	right:70,
	height:30,
	borderColor:'#429BDA',
	color:'#429BDA',
	borderRadius:5,
	backgroundColor:'#EEE',
	font:{fontSize:12},
});
var last = Ti.UI.createLabel({
	text:L('Última'),
	textAlign:'center',
	width:60,
	right:5,
	height:30,
	borderColor:'#429BDA',
	color:'#429BDA',
	borderRadius:5,
	backgroundColor:'#EEE',
	font:{fontSize:12},
});
var currentPage = Ti.UI.createLabel({
	text:page + ' / ' + lastPage,
	textAlign:'center',
	width:50,
	height:30,
	borderColor:'#429BDA',
	color:'#429BDA',
	borderRadius:5,
	backgroundColor:'#EEE',
	font:{fontSize:12},
})

paginate.add(first);
paginate.add(prev);
paginate.add(next);
paginate.add(last);
paginate.add(currentPage);

win.add(paginate);

if (page == 1) {
	first.color = prev.color = '#999';
	first.borderColor = prev.borderColor = '#999';
}
if (page == lastPage) {
	last.color = next.color = '#999';
	last.borderColor = next.borderColor = '#999';
}

first.addEventListener('click', function() {
	if (page != 1) {
		reload(1, this);
	}
});
prev.addEventListener('click', function() {
	if (page != 1) {
		reload(page - 1, this);
	}
});
next.addEventListener('click', function() {
	if (page != lastPage) {
		reload(page + 1, this);
	}
});
last.addEventListener('click', function() {
	if (page != lastPage) {
		reload(lastPage, this);
	}
});

function reload(p, button) {
	launchAnimation(button);
	page = p;
	Ti.include(loadFrom);
	tableData = [];
	tableView.data = null;
	win.remove(tableView);
	loading.show();
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
}

function launchAnimation(button) {
	var anim = Ti.UI.createAnimation({
		color:'#FFF',
		borderColor:'#FFF',
		backgroundColor:'429BDA',
		duration:500
	});
	button.animate(anim);
}
