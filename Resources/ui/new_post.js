var win = Ti.UI.currentWindow;

var cancelButton = Ti.UI.createButton({
	title:L('Cancelar')
});
var saveButton = Ti.UI.createButton({
	title:L('Guardar')
});

win.rightNavButton = saveButton;
win.leftNavButton = cancelButton;

cancelButton.addEventListener('click', function() {
	win.root.close({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
});
saveButton.addEventListener('click', function() {
	win.root.close({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
});

var view = Ti.UI.createView({
	backgroundColor:'#FFF',
	layout:'vertical'
});

var title = Ti.UI.createTextField({
	hintText: L('Título'),
	top:20,
	left:15,right:15,
	backgroundColor:'#FFF',
	borderRadius: 3,
	borderColor:'#999'
});

var text = Ti.UI.createTextArea({
	value: L('Texto'),
	color:'#CCC',
	top:20,
	height:100,
	left:15,right:15,
	backgroundColor:'#FFF',
	borderRadius: 3,
	borderColor:'#999'
});

text._hintText = text.value;

text.addEventListener('focus', function(e) {
	if (e.source.value == e.source._hintText) {
		e.source.value = '';
		e.source.color = '#000';
	}
});
text.addEventListener('blur', function(e){
    if(e.source.value == ''){
        e.source.value = e.source._hintText;
		e.source.color = '#CCC';
    }
});

setTimeout(function() {
	title.focus();
}, 300)

view.add(title);
view.add(text);

win.add(view);
