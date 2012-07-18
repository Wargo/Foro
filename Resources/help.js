function help(text, left) {
	var help = Ti.UI.createView({
		backgroundColor:'#000',
		opacity:0,
		top:5,
		right:5,
		borderRadius:5,
		width:130,
		height:40,
		zIndex:1000
	});
	if (left) {
		help.right = null;
		help.left = 5;
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
	
	/*
	help.appear = appearHelp;
	help.disappear = disappearHelp;
	help.helpText = helpText;
	*/
	win.add(help);
	help.animate(appearHelp);
	
	//return helpText;
}
module.exports = help