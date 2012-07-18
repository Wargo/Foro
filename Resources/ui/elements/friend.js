var title = Ti.UI.createLabel({
	text:data[i].name,
	font:{fontSize:14},
	color:'#257CBC',
	top:10,
	height:40,
	left:70,
	right:25
});

var image = Ti.UI.createImageView({
	image:data[i].avatar,
	defaultImage:'images/clock.png',
	left:10,
	top:15,
	width:48,
	height:48
});

var margin = 7;

var content = Ti.UI.createView({
	backgroundColor:'#FFF',
	height:80,
	left:margin,
	right:margin,
	top:0,
	bottom:1
});

var icon1 = Ti.UI.createImageView({
	image:'images/mail.png',
	left:10
});
var text1 = Ti.UI.createLabel({
	left:10,
	text:L('Enviar mensaje'),
	textAlign:'center',
	color:'#CCC',
	font:{fontWeight:'bold',fontSize:15}
});
var send = Ti.UI.createView({
	borderColor:'#CCC',
	borderRadius:10,
	width:150,
	top:12,
	bottom:12,
	right:10,
	layout:'horizontal'
});
send.add(icon1);
send.add(text1);

content.index = i + 1;
content.title = title;
content.id = data[i].id;
content.image = image;

content.add(send);
content.add(image);
content.add(title);

var row = Ti.UI.createTableViewRow({
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
});

if (i == 0 && page == 1) {
	content.top = margin;
}
row.add(content);
tableView.appendRow(row);

/*
if (page > 1) {
	tableView.appendRow(row);
} else {
	tableData.push(row);
	if (i == 0) {
		content.top = margin;
	}
	if (i == data.length - 1) {
		// Si no, al concatenar se queda feo
		//content.bottom = margin;
	}
}
*/

content.addEventListener('click', function(e) {
	if (e.source.index) {
		var current = e.source;
	} else {
		var current = e.source.parent;
		if (typeof current.title == 'undefined') {
			current = current.parent;
		}
	}
	
	if (typeof current.title == 'undefined') {
		return;
	}
	
	var post = Ti.UI.createWindow({
		url:'answer.js',
		barColor:'#429BDA',
		title:L('Enviar mensaje')
	});
	post.user_id = current.id;
	
	var animation = Ti.UI.createAnimation({
		backgroundColor:'#429BDA',
		duration:100
	});
	
	post.current = current;
	
	animation.addEventListener('complete', function() {
		current.backgroundColor = '#FFF';
	});
	current.animate(animation);

	var nav = Ti.UI.iPhone.createNavigationGroup({
		window:post
	});
	var root = Ti.UI.createWindow();
	root.add(nav);
	root.open({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
	post.root = root;
	post.nav = nav;
});
