Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady: function() {
    	area.init();
    	line.init();
    	bar.init();
    	pie.init();
        var carousel = new Ext.Carousel({
            defaults: {
                cls: 'card'
            },
            indicator:true,
            items: [
            	area.panel,
            	line.panel,
            	bar.panel,
            	pie.panel
            	
            ]
        });
        new Ext.Panel({
            fullscreen: true,
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'center',

            },
            
            defaults: {
                flex: 1
            },
            items: carousel
        });
    }
});