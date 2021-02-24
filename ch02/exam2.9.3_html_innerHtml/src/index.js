Ext.setup({
    icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: false,
    onReady: function() {
    	var htmlPage = 
		'<iFrame NAME="IF1" src="iframe.html" width="100%", height="100%" ' + 
		'frameborder="0"="0"  border="0" cellspacing="0" cellpadding="0" scrolling="1">' + 
		'</iFrame>';    	
		var panel = new Ext.Panel({
		    fullscreen: true,
		    dockedItems: [{
		            dock : 'top',
		            xtype: 'toolbar',
		            title: 'HTML∆‰¿Ã¡ˆ'
		    }],
		    html: htmlPage
		});    
	}
});
