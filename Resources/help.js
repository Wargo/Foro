function help (text, left) {
	//Ti.App.Properties.removeProperty(text);
	if (Ti.App.Properties.getInt(text, 0) < 3) {
		Ti.App.Properties.setInt(text, Ti.App.Properties.getInt(text, 0) + 1);
	} else {
		return;
	}
	var help = Ti.UI.createView({
		backgroundColor:'#000',
		opacity:0,
		top:2,
		right:2,
		borderRadius:5,
		width:130,
		height:40,
		zIndex:1000
	});
	if (left) {
		help.right = null;
		help.left = 2;
	}
	var helpText = Ti.UI.createLabel({
		color:'white',
		top:5,right:5,left:30,bottom:5,
		textAlign:'center',
		font:{fontSize:13},
		text:text
	});
	var helpIco = Ti.UI.createImageView({
		image:'/ui/images/info.png',
		left:10,
		width:20,
		height:20
	});
	help.add(helpIco);
	help.add(helpText);
	var appearHelp = Ti.UI.createAnimation({duration:600, opacity:0.8});
	var disappearHelp = Ti.UI.createAnimation({duration:600, opacity:0});
	appearHelp.addEventListener('complete', function() {
		setTimeout(function() {
			help.animate(disappearHelp);
		}, 2000);
	});
	
	win.add(help);
	help.animate(appearHelp);
}
module.exports = help