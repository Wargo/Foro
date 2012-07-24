var Cloud = require('ti.cloud');
var user_device_token 	= Ti.App.Properties.getString("device_token", null);
var username = Ti.App.Properties.getString('user');
var password = 'DKJ3aD8JmV5Nbcd73';

getDeviceToken();

//REGISTER USER ON CLOUD
function registerUser(){
	Cloud.Users.create({
	    username: username,
	    password: password,
	    password_confirmation: password,
	    first_name: "Firstname",
	    last_name: "Lastname"
	}, function (e) {
	    if (e.success) {
	    	Ti.API.info('registerUser OK');
	    } else {
	    	Ti.API.info('error registering user');
	    }
	    login();
	});
}

//LOGIN TO CLOUD AS A USER THAT WE CREATED BEFORE
function login(){
	Cloud.Users.login({
	    login: username,
	    password: password
	}, function (e) {
	    if (e.success) {
	        var user = e.users[0].id;
	        Ti.App.Properties.setString("cloud_user_id", user);
	        Ti.API.info('Login OK');
	        subscribeToServerPush();
	    } else {
	        Ti.API.info('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}
//REGISTER LOCAL PUSH NOTIFICATION HERE
function getDeviceToken() {
	Titanium.Network.registerForPushNotifications({
	    types: [
	        Titanium.Network.NOTIFICATION_TYPE_BADGE,
	        Titanium.Network.NOTIFICATION_TYPE_ALERT,
	        Titanium.Network.NOTIFICATION_TYPE_SOUND
	    ],
	    success:function(e) {
	        user_device_token = e.deviceToken;
	        Ti.App.Properties.setString("device_token", user_device_token);
			Ti.API.info("Device token: " + user_device_token);
			registerUser();
	    },
	    error:function(e) {
	        Ti.API.info("Error during registration: " + e.error);
	    },
	    callback:function(e) {
	    	var help = require('help');
			help(L('Tienes un mensaje nuevo'));
      		
      		var badge = e.data.badge;
			Titanium.UI.iPhone.appBadge = badge;
			Ti.App.tab5.setBadge(badge);
			Ti.UI.iPhone.appBadge = badge;
			if (typeof b != 'undefined') {
				if (Titanium.UI.iPhone.appBadge) {
					b.text = badge;
					c.add(b);
				} else {
					c.remove(b);
				}
			}
			
			
			/*
	        if (Ti.App.tabGroup.activeTab != 3) {
	        	Ti.App.goToMessages = true;
	        	Ti.App.tabGroup.setActiveTab(3);
	        } else {
	        	open('inbox');
	        }
	        */
	    }
	});
}

//REGISTER SERVER PUSH 
function subscribeToServerPush(){
	Cloud.PushNotifications.subscribe({
    	channel: 'friend_request',
    	type: 'ios',
    	device_token: user_device_token
	}, function (e) {
	    if (e.success) {
	    	//Ti.API.info('Success'+((e.error && e.message) || JSON.stringify(e)));
	    	var path = Ti.App.dataURL + 'subscribe.php';
			var client = Ti.Network.createHTTPClient({
				onload: function(e) {
					Ti.API.info('ok');
				},
				onerror: function(e) {
					Ti.API.info('error');
				},
				timeout: 15000
			});
			
			client.open('POST', path);
			client.send({
				user_id:Ti.App.Properties.getString('login', null),
				token:Ti.App.Properties.getString('token', null),
				push_id:Ti.App.Properties.getString('cloud_user_id', null)
			});
	    } else {
	        //Ti.API.info('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}


