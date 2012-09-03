var win = Ti.UI.currentWindow;
win.title = L('Añadir amigas');
win.barColor = '#429BDA';
win.backgroundColor = '#FFF';
var page = 1;

var ad = Ti.UI.iOS.createAdView({
	bottom:-200,
	zIndex:100,
	height:Ti.UI.SIZE,
	width:Ti.UI.SIZE
});
win.add(ad);
ad.addEventListener('load', function() {
	ad.animate({bottom:0, duration:300});
	tableView.animate({bottom:50, duration:300});
});
ad.addEventListener('error', function() {
	ad.animate({bottom:-200, duration:300});
	tableView.animate({bottom:40, duration:300});
});

var search = Titanium.UI.createSearchBar({
	barColor:'#429BDA', 
	autocapitalization:Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
	//showCancel:true,
	height:43,
	hintText:L('Buscar por nombre'),
	top:0
});
search.focus();
search.hasFocus = true;

var tableData = [];
var tableView = Ti.UI.createTableView({
	backgroundColor: '#DDD',
	//search: search,
	//top:0
	top:43
});
win.add(tableView);
win.add(search);

search.addEventListener('focus', function() {
	search.hasFocus = true;
	tableView.scrollToTop();
});

tableView.addEventListener('scroll', function() {
	if (search.hasFocus == true) {
		search.blur();
		search.hasFocus = false;
	}
});
 
search.addEventListener('change', function(e) {
	var aux = search.value;
	setTimeout(function() {
		if (aux == search.value) {
			auto_complete(search.value)
		}
	}, 500)
});

var element = 'elements/result.js';
var data = '';
var error = '';
var loadFrom = '/search.js';
var search_term = '';

var loading = Titanium.UI.createActivityIndicator({
    message:'',
    style:Titanium.UI.iPhone.ActivityIndicatorStyle.DARK,
    top:'50%'
});
win.add(loading);

function auto_complete(search_term) {
	loading.show();
	tableView.scrollToTop();
	page = 1;
	if (search_term.length > 0) {
		data = [];
		lastRow = 0;
		Ti.include(loadFrom);
		//search(search_term);
		var interval = setInterval(function() {
			if (data) {
				loading.hide();
				tableData = [];
				for (i in data) {
					Ti.include(element);
				}
				clearInterval(interval);
				//loading.hide();
				tableView.data = tableData;
				win.add(tableView);
			}
			if (error) {
				alert(error);
				clearInterval(interval);
				//loading.hide();
				//win.remove(loading);
			}
		}, 100);
	} else {
		loading.hide();
		tableData = [];
		tableView.setData(tableData);
	}
}

Ti.include('/ui/append.js');
