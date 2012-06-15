var win = Ti.UI.currentWindow;

var profileView = Ti.UI.createView();
Ti.include('profile.js');

var loginView = Ti.UI.createView();
Ti.include('login.js');

win.addEventListener('focus', function() {
	if (Ti.App.Properties.getString('login')) {
		win.add(profileView);
		win.remove(loginView);
	} else {
		win.add(loginView);
		win.remove(profileView);
	}
});