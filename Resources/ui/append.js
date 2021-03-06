var updating = false;
var lastRow = 0;

var loadingRow = Ti.UI.createTableViewRow({
	height: 65,
	font:{fontSize:14},
	focusable:false,
	color:'#CCC'
});

var loadingMore = Ti.UI.createActivityIndicator({
    message:L('Cargando...'),
    style:Titanium.UI.iPhone.ActivityIndicatorStyle.DARK,
    font:{fontSize:12}
});

var loadingRowView = Ti.UI.createView();

loadingRowView.add(loadingMore);
loadingRow.add(loadingRowView);
loadingMore.show();

function beginUpdate(){
	if (typeof search != 'undefined') {
		if (search.value == '') {
			return;
		}
	}
	updating = true;
	tableView.appendRow(loadingRow);
	
	if (typeof cols != 'undefined') {
		lastRow += Math.ceil(data.length / cols);
	} else {
		lastRow += data.length;
	}
	
	data = null;
	page += 1;
	Ti.include(loadFrom);
	var interval = setInterval(function() {
		if (data) {
			for (i in data) {
				Ti.include(element);
			}
			clearInterval(interval);
			tableView.deleteRow(lastRow);
			if (data.length > 0) {
				updating = false;
			}
			if (typeof editing != 'undefined' && editing == true) {
				startAddToFav(false);
			}
		}
		if (error) {
			//endReloading(null);
			clearInterval(interval);
		}
	}, 100);
}

var lastDistance = 0; // calculate location to determine direction

tableView.addEventListener('scroll', function(e){
	var offset = e.contentOffset.y;
	var height = e.size.height;
	var total = offset + height;
	var theEnd = e.contentSize.height;
	var distance = theEnd - total;

	// going down is the only time we dynamically load,
	// going up we can safely ignore -- note here that
	// the values will be negative so we do the opposite
	if (distance < lastDistance) {
		// adjust the % of rows scrolled before we decide to start fetching
		var nearEnd = theEnd * .95;
		if (!updating && (total >= nearEnd)) {
			if (data.length > 10) {
				beginUpdate();
			}
		}
	}
	lastDistance = distance;
});

