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
	
	//Ti.UI.iPhone.hideStatusBar();
	
	Ti.App.dataURL = 'http://elembarazo.net/appMovil/';
	
	function strpos (haystack, needle, offset) {
		var i = (haystack + '').indexOf(needle, (offset || 0));
	    return i === -1 ? false : i;
	}
	function inArray(needle, haystack) {
	    var length = haystack.length;
	    for(var i = 0; i < length; i++) {
	        if(haystack[i] == needle) return true;
	    }
	    return false;
	}

	Ti.App.inArray = inArray;
	Ti.App.strpos = strpos;
	
	Ti.App.goToMessages = false;
	
	var tabGroup = Ti.UI.createTabGroup();
	
	var posts = Ti.UI.createWindow({
		backgroundColor:'#CCC',
		title:L('Foro Elembarazo.net'),
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
		title:L('Mis foros'),
		url:'ui/favorites.js',
		barColor:'#429BDA'
	});
	
	var tab2 = Ti.UI.createTab({
		icon:'ui/images/star.png',
		title:L('Mis foros'),
		window: favorites
	});
	favorites.containingTab = tab2;
	
	var recent = Ti.UI.createWindow({
		backgroundColor:'#CCC',
		title:L('Recientes'),
		url:'ui/recent.js',
		barColor:'#429BDA'
	});
	
	var tab3 = Ti.UI.createTab({
		title:L('Más recientes'),
		icon:'ui/images/recents.png',
		window: recent
	});
	recent.containingTab = tab3;
	
	var profile = Ti.UI.createWindow({
		backgroundColor:'#CCC',
		url:'ui/profile.js',
		barColor:'#429BDA'
	});
	
	var tab5 = Ti.UI.createTab({
		title:L('Mi perfil'),
		icon:'ui/images/profile.png',
		window: profile
	});
	profile.containingTab = tab5;
	Ti.App.tab5 = tab5;
	
	tabGroup.addTab(tab1);
	tabGroup.addTab(tab3);
	tabGroup.addTab(tab2);
	tabGroup.addTab(tab5);
	
	tabGroup.open();
	
	//Ti.include('/notifications.js');
	
	Ti.App.tabGroup = tabGroup;
	
	if (Ti.App.Properties.getString('login')) {
		Ti.include('/bg_cloud.js');
	}
	
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
