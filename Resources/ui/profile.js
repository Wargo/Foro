var win = Ti.UI.currentWindow;

win.backgroundColor = '#FFF';
win.title = L('Tu perfil');
win.barColor = '#429BDA';
win.layout = 'vertical';

var emptyView = Titanium.UI.createView();
//win.leftNavButton = emptyView;

var userLabel = Ti.UI.createLabel({text:Ti.App.Properties.getString('user', L('No estás atuentificado'))});
var userLogin = Ti.UI.createLabel({text:'ID: ' + Ti.App.Properties.getString('login')});

var disconnect = Ti.UI.createLabel({
	text:L('Desconectar'),
	color:'red'
});
disconnect.addEventListener('click', function() {
	Ti.App.Properties.setString('login', null);
	Ti.App.Properties.setString('user', null);
	Ti.App.Properties.setString('pass', null);
	switchPage(win);
});

var goLogin = Ti.UI.createButton({
	title:L('Login')
});
	
goLogin.addEventListener('click', function() {
	var login = Ti.UI.createWindow({url:'login.js'});
	login.p = win;
	login.switchPage = switchPage;
	Ti.UI.currentTab.open(login);
});

var currentStatus = '';

win.add(userLabel);
switchPage(win);

win.addEventListener('focus', function() {
	if (Ti.App.Properties.getString('login')) {
		//if (userLabel.text != Ti.App.Properties.getString('user')) {
		if (currentStatus == 'out') {
			switchPage(win);
		}
	} else {
		//if (userLabel.text != L('No estás autentificado')) {
		if (currentStatus == 'in') {
			switchPage(win);
		}
	}
});
	

function switchPage(win) {
	if (Ti.App.Properties.getString('login')) {
		currentStatus = 'in';
		win.rightNavButton = emptyView;
		userLabel.text = Ti.App.Properties.getString('user');
		userLogin.text = 'ID: ' + Ti.App.Properties.getString('login');
		win.add(userLogin);
		win.add(disconnect);
	} else {
		currentStatus = 'out';
		userLabel.text = L('No estás autentificado');
		win.remove(userLogin);
		win.rightNavButton = goLogin;
		win.remove(disconnect);
	}
}
