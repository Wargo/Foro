var win = Ti.UI.currentWindow;

win.barColor = '#429BDA';

var createPost = Ti.UI.createButton({
	title:L('+')
});

win.rightNavButton = createPost;

Ti.include('/data.js');

tableData = [];
index = 0;
for (i in data) {
	var row = Ti.UI.createTableViewRow({
		backgroundColor:'#CCC',
		height:90,
		link:data[i].url
	});
	var title = Ti.UI.createLabel({
		text:data[i].title,
		font:{fontSize:24},
		color:'#257CBC',
		top:3,
		height:35,
		left:'5%',
		width:'90%'
	});
	var intro = Ti.UI.createLabel({
		text:data[i].intro,
		font:{fontSize:18},
		color:'#333',
		top:35,
		left:'5%',
		height:45,
		width:'90%'
	});

	if (Ti.Platform.osname != 'android') {
		intro.left = title.left = 70;
		title.top = 6;
		title.font = {fontSize:18};
		intro.font = {fontSize:14};
		if (Ti.Platform.osname == 'iphone') {
			title.width = 230;
			intro.width = 230;
		}
		if (Ti.Platform.osname == 'ipad') {
			title.font = {fontSize:28};
			intro.font = {fontSize:20};
			row.height = 110;
			intro.height = 60;
		}
	}
	
	var content = Ti.UI.createView({
		//borderRadius:5,
		backgroundColor:'#FFF'
	})
	
	content.add(title);
	content.add(intro);
	row.add(content);
	row.hasChild = data[i].hasChild;
	row.leftImage = data[i].leftImage;
	tableData.push(row);
}

var tableView = Ti.UI.createTableView({
	data:tableData,
	//separatorColor:'#429BDA',
	left:10,right:10,
	separatorColor:'#CCC',
	backgroundColor:'#CCC'
});

win.add(tableView);

tableView.addEventListener('click', function(e) {
	var current = e.index;
	open_window(current, data, false);
});

//win.add(self);
