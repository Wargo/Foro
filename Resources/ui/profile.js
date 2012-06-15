var win = Ti.UI.currentWindow;

win.addEventListener('focus', function() {
	if (!Ti.App.Properties.getString('login')) {
		Ti.UI.currentTab.open(Ti.UI.createWindow({url:'login.js'}), {animated:false});
		//Ti.UI.currentTab.window = Ti.UI.createWindow({url:'login.js'});
		//Ti.UI.currentTab.setWindow(Ti.UI.createWindow({url:'login.js'}));
	}
});

win.backgroundColor = '#FFF';
win.title = L('Tu perfil');
win.barColor = '#429BDA';
win.layout = 'vertical';

var emptyView = Titanium.UI.createView();
win.leftNavButton = emptyView;

win.add(Ti.UI.createLabel({text:Ti.App.Properties.getString('user')}));
//win.add(Ti.UI.createLabel({text:Ti.App.Properties.getString('pass')}));
win.add(Ti.UI.createLabel({text:'ID: ' + Ti.App.Properties.getString('login')}));

var desconnect = Ti.UI.createLabel({
	text:L('Desconectar'),
	color:'red'
});

win.add(desconnect);

desconnect.addEventListener('click', function() {
	Ti.App.Properties.setString('login', null);
	Ti.App.Properties.setString('user', null);
	Ti.App.Properties.setString('pass', null);

	Ti.UI.currentTab.open(Ti.UI.createWindow({url:'login.js'}), {animated:false});
	//Ti.UI.currentTab.window = Ti.UI.createWindow({url:'login.js'});
	//Ti.UI.currentTab.setWindow(Ti.UI.createWindow({url:'login.js'}));
});

Ti.App.addEventListener('app:refreshTable',loadWindowData);

function loadWindowData() {
	alert('a');
}
