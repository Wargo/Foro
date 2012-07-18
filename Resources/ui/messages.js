var messages = Ti.UI.createLabel({
	text:L('Mensajes privados'),
	top:10,
	color:'#429BDA',
	font:{fontWeight:'bold'}
});
var icon1 = Ti.UI.createImageView({
	image:'images/inbox.png',
	top:10
});
var text1 = Ti.UI.createLabel({
	top:10,
	text:L('Bandeja de entrada'),
	textAlign:'center',
	color:'#CCC',
	font:{fontWeight:'bold',fontSize:18}
});
var inbox = Ti.UI.createView({
	borderColor:'#CCC',
	borderRadius:10,
	width:130,
	height:120,
	top:40,
	left:10,
	layout:'vertical'
});
inbox.add(icon1);
inbox.add(text1);
var b = Ti.UI.createLabel({
	color:'white',
	backgroundColor:'red',
	borderColor:'white',
	borderWidth:2,
	textAlign:'center',
	font:{fontSize:12,fontWeight:'bold'},
	width:18,
	height:18,
	top:50,
	left:20,
	borderRadius:6
});

var icon2 = Ti.UI.createImageView({
	//image:'images/outbox.png',
	image:'images/mail.png',
	top:10
});
var text2 = Ti.UI.createLabel({
	top:10,
	text:L('Enviar nuevo mensaje'),
	textAlign:'center',
	color:'#CCC',
	font:{fontWeight:'bold',fontSize:18}
});
var outbox = Ti.UI.createView({
	borderColor:'#CCC',
	borderRadius:10,
	width:130,
	height:120,
	top:40,
	right:10,
	layout:'vertical'
});
outbox.add(icon2);
outbox.add(text2);

var c = Ti.UI.createView({
	backgroundColor:'#FFF',
	borderRadius:5,
	left:margin,
	right:margin,
	top:margin,
	height:180
});

win.addEventListener('focus', function() {
	b.text = Titanium.UI.iPhone.appBadge;
	if (Titanium.UI.iPhone.appBadge) {
		c.add(b);
	} else {
		c.remove(b);
	}
});

c.add(messages);
c.add(inbox);
c.add(outbox);

var rowMessages = Ti.UI.createTableViewRow({
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
});

rowMessages.add(c);
//tableData.push(rowMessages);
//view.data = tableData;
view.appendRow(rowMessages);

inbox.addEventListener('click', function(e) {
	open('inbox');
});
outbox.addEventListener('click', function(e) {
	open('outbox');
});

function open(folder) {
	var animation = Ti.UI.createAnimation({
		backgroundColor:'#429BDA',
		duration:300
	});
	var item = eval(folder);
	animation.addEventListener('complete', function() {
		item.backgroundColor = null;
	});
	item.animate(animation);
	if (folder == 'inbox') {
		var folderWin = Ti.UI.createWindow({url:'folder.js'});
		folderWin.folder = folder;
	} else {
		var folderWin = Ti.UI.createWindow({url:'friends.js'});
	}
	
	Ti.UI.currentTab.open(folderWin);
}
