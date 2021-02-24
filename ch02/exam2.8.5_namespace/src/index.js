Ext.ns("main");


Ext.setup({
    icon: 'icon.png',
    glossOnIcon: false,
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    onReady: function() {
        
        first.init();
        second.init();
        
        main.panel = new Ext.Panel({
            fullscreen: true,
            cardSwitchAnimation:"slide",
            layout:'card',   
            items:[first.panel, second.panel],
            
            dockedItems :[{
                dock: 'top',
                xtype: 'toolbar',
                items: [
                {
                    cls:'card1',
                    text: '첫번째',
                    handler: function(btn,event){                       
                        main.panel.layout.setActiveItem(first.panel);
                        main.panel.doLayout();
                    }
                },
                {
                    cls:'card2',
                    text: '두번째',
                    handler: function(btn,event){
                        main.panel.layout.setActiveItem(second.panel);
                        main.panel.doLayout();
                    }
                }]
               
            }], 
        });         
    }
});




