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

var icon2 = Ti.UI.createImageView({
	image:'images/outbox.png',
	top:10
});
var text2 = Ti.UI.createLabel({
	top:10,
	text:L('Bandeja de salida'),
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
c.add(messages);
c.add(inbox);
c.add(outbox);

var row = Ti.UI.createTableViewRow({
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
});

row.add(c);
tableData.push(row);
view.data = tableData;

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
		item.backgroundColor = '#FFF';
	});
	item.animate(animation);
	var folderWin = Ti.UI.createWindow({url:'folder.js'});
	folderWin.folder = folder;
	Ti.UI.currentTab.open(folderWin);
}
