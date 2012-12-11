
module.exports = function(properties) {
	
	// require AdMob
	var Admob = require('ti.admob');
	
	if (Ti.Platform.osname === 'android') {
	
		// then create an adMob view
		var adMobView = Admob.createView({
		    publisherId:"a150b48b3d51124",
		    testing:false, // default is false
		    //top: 10, //optional
		    //left: 0, // optional
		    //right: 0, // optional
		    bottom: '65dp', // optional
		    adBackgroundColor:"FF8855", // optional
		    backgroundColorTop: "738000", //optional - Gradient background color at top
		    borderColor: "#000000", // optional - Border color
		    textColor: "#000000", // optional - Text color
		    urlColor: "#00FF00", // optional - URL color
		    linkColor: "#0000FF", //optional -  Link text color
			keywords: L('keywords'),
			gender: 'female',
		    zIndex:999
		});
		
		//listener for adReceived
		adMobView.addEventListener(Admob.AD_RECEIVED, function(){
		   // alert("ad received");
		   Ti.API.info("ad received");
		   tableView.bottom = '120dp';
		});
		
		//setTimeout(function() {
		//todayButton.addEventListener('click', function() {
			//adMobView.requestAd();
		//});
		//}, 5000);
		
		//listener for adNotReceived
		adMobView.addEventListener(Admob.AD_NOT_RECEIVED, function(){
		    //alert("ad not received");
			Ti.API.info("ad not received");
			tableView.bottom = '65dp';
			adMobView.requestAd();
		});
		
		//view.add(adMobView);
		
		return adMobView;
		
	} else { // iOS
		
		var ad = Admob.createView(properties);
		
		ad.addEventListener('didReceiveAd', function() {
		    //alert('Did receive ad!');
		    //tableView.animate({bottom: 115});
		});
		ad.addEventListener('didFailToReceiveAd', function() {
		    //alert('Failed to receive ad!');
		    //tableView.animate({bottom: 65});
		});
		ad.addEventListener('willPresentScreen', function() {
		    //alert('Presenting screen!');
		});
		ad.addEventListener('willDismissScreen', function() {
		    //alert('Dismissing screen!');
		});
		ad.addEventListener('didDismissScreen', function() {
		    //alert('Dismissed screen!');
		});
		ad.addEventListener('willLeaveApplication', function() {
		    //alert('Leaving the app!');
		});
		
		//view.add(ad);
		return ad;
		
	}
	
}
