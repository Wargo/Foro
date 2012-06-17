var win = Ti.UI.currentWindow;

var loginView = Ti.UI.createView();
var profileView = Ti.UI.createView({
	layout:'vertical'
});

var loginIncluded = profileIncluded = false;

win.addEventListener('focus', function() {
	if (Ti.App.Properties.getString('login')) {
		//if (!profileIncluded) {
			Ti.include('profile.js');
			profileIncluded = true;
			if (loginIncluded) {
				win.remove(loginView);
			}
		//}
		win.add(profileView);
	} else {
		//if (!loginIncluded) {
			Ti.include('login.js');
			loginIncluded = true;
			if (profileIncluded) {
				win.remove(profileView);
			}
		//}
		win.add(loginView);
	}
});