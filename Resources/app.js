/*
 * Single Window Application Template:
 * A basic starting point for your application.  Mostly a blank canvas.
 * 
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *  
 */

//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');	  	
}

// This is a single context application with mutliple windows in a stack
(function() {
	
	var tabGroup = Ti.UI.createTabGroup();
	
	var posts = Ti.UI.createWindow({
		backgroundColor:'#CCC',
		title:L('Foro'),
		url:'ui/categories.js',
		barColor:'#429BDA'
	});
	
	var tab1 = Ti.UI.createTab({
		title: L('Foro'),
		icon: 'ui/images/foro.png',
		window: posts
	});
	posts.containingTab = tab1;
	
	var favorites = Ti.UI.createWindow({
		backgroundColor:'#CCC',
		title:L('Favoritos'),
		url:'ui/favorites.js',
		barColor:'#429BDA'
	});
	
	var tab2 = Ti.UI.createTab({
		icon: Ti.UI.iPhone.SystemIcon.FAVORITES,
		window: favorites
	});
	favorites.containingTab = tab2;
	
	tabGroup.addTab(tab1);
	tabGroup.addTab(tab2);
	
	tabGroup.open();
	
	/*
	var root = Ti.UI.createWindow();
	
	var nav = Ti.UI.iPhone.createNavigationGroup({
		window:win
	});
	
	win.nav = nav;
	root.add(nav);
	root.open();
	*/
	
	
	/*
	//determine platform and form factor and render approproate components
	var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	
	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	
	var Window;
	if (isTablet) {
		Window = require('ui/tablet/ApplicationWindow');
	}
	else {
		// Android uses platform-specific properties to create windows.
		// All other platforms follow a similar UI pattern.
		if (osname === 'android') {
			Window = require('ui/handheld/android/ApplicationWindow');
		}
		else {
			Window = require('ui/handheld/ApplicationWindow');
		}
	}
	new Window().open();
	*/
})();
