var border = Ti.UI.createView({
	backgroundColor:"#666",
	height:1,
	bottom:0
})
 
var tableHeader = Ti.UI.createView({
	backgroundColor:"#EEE",
	height:60
});

var arrow = Ti.UI.createView({
	backgroundImage:"images/arrow.png",
	width:40,
	height:40,
	bottom:10,
	left:20
});
 
var statusLabel = Ti.UI.createLabel({
	text:L('Desliza para recargar...'),
	left:55,
	width:200,
	bottom:30,
	height:"auto",
	color:"#333",
	textAlign:"center",
	font:{fontSize:13,fontWeight:"bold"},
	shadowColor:"#999",
	shadowOffset:{x:0,y:1}
});
 
var lastUpdatedLabel = Ti.UI.createLabel({
	text:L('Última actualización') + ': ' +  formatDate(),
	left:55,
	width:220,
	bottom:15,
	height:"auto",
	color:"#333",
	textAlign:"center",
	font:{fontSize:12},
	shadowColor:"#999",
	shadowOffset:{x:0,y:1}
});
var actInd = Titanium.UI.createActivityIndicator({
	left:20,
	bottom:13,
	width:30,
	height:30,
	style:Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
});

tableHeader.add(border);
tableHeader.add(arrow);
tableHeader.add(statusLabel);
tableHeader.add(lastUpdatedLabel);
tableHeader.add(actInd);

function formatDate() {
	var objToday = new Date(),
    weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
    dayOfWeek = weekday[objToday.getDay()],
    domEnder = new Array( 'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th' ),
    dayOfMonth = (objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder[objToday.getDate()] : objToday.getDate() + domEnder[parseFloat(("" + objToday.getDate()).substr(("" + objToday.getDate()).length - 1))],
    months = new Array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'),
    curMonth = months[objToday.getMonth()],
    curYear = objToday.getFullYear(),
    //curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
    curHour = objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours(),
    curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
    curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
    curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
	//return curHour + ":" + curMinute + "." + curSeconds + curMeridiem + " " + dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear;
	return curHour + ":" + curMinute;
}

tableView.headerPullView = tableHeader;

tableView.addEventListener('scroll',function(e) {
	var offset = e.contentOffset.y;
	if (offset <= -65.0 && !pulling) {
		var t = Ti.UI.create2DMatrix();
		t = t.rotate(-180);
		pulling = true;
		arrow.animate({transform:t,duration:180});
		statusLabel.text = L('Suelta para recargar...');
	} else if (pulling && offset > -65.0 && offset < 0) {
		pulling = false;
		var t = Ti.UI.create2DMatrix();
		arrow.animate({transform:t,duration:180});
		statusLabel.text = L('Desliza para recargar...');
	}
});

tableView.addEventListener('scrollEnd',function(e) {
	if (pulling && !reloading && e.contentOffset.y <= -65.0) {
		reloading = true;
		pulling = false;
		arrow.hide();
		actInd.show();
		statusLabel.text = L('Recargando...');
		tableView.setContentInsets({top:60},{animated:true});
		arrow.transform=Ti.UI.create2DMatrix();
		beginReloading();
	}
});

var pulling = false;
var reloading = false;
 
function beginReloading() {
	// Reseteando valores
	data = null;
	if (typeof first == 'undefined') { // Si está en paginador append (NO es post.js)
		page = 1;
	}
	lastRow = 0;
	
	Ti.include(loadFrom);
	var interval = setInterval(function() {
		if (data) {
			endReloading(data, null);
			clearInterval(interval);
			
			// Reseteando paginación "append"
			updating = false;
		}
		if (error) {
			endReloading(null, error);
			clearInterval(interval);
		}
	}, 100);
}
 
function endReloading(data, error) {
	if (data) {
		tableData = [];
		if (typeof rowTitle != 'undefined') {
			tableData.push(rowTitle);
		}
		
		for (i in data) {
			//Ti.include('/ui/elements/category.js');
			Ti.include(element);
		}
		clearInterval(interval);
		loading.hide();
		//win.remove(loading);
		tableView.data = tableData;
		win.add(tableView);
		
		if (typeof editing != 'undefined' && editing == true) {
			startAddToFav(false);
		}
	} else {
		alert(error)
	}
	
	// when you're done, just reset
	tableView.setContentInsets({top:0},{animated:true});
	reloading = false;
	lastUpdatedLabel.text = L('Última actualización') + ': ' + formatDate();
	statusLabel.text = L('Desliza para recargar...');
	actInd.hide();
	arrow.show();
}

var first_time = true;
win.addEventListener('focus', function() {
	if (!first_time) {
		beginReloading();
	}
	first_time = false;
})
