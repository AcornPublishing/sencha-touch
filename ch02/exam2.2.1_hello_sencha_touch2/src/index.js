Ext.setup({
    icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: false,
    onReady: function() {
		console.log("Hello Sencha touch Console!!");
		new Ext.Panel({
			fullscreen:true,
			html:'<BR><BR><BR><center>Hello Sencha Touch!!</center>',			
			//unkown:error occur!!	// 강제오류를 일으킨 곳			
	
		});
    }
});