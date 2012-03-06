Ext.setup({
    icon: 'icon.png',
    glossOnIcon: false,
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    onReady: function() {
        var dockedItems = [{
            dock: 'top',
            xtype: 'toolbar',
            items: [{
                text: '두번째 페이지로 이동',
                handler: function(btn,event){
                    document.location = "index2.html";                  
                }
            }]
        }];
        new Ext.Panel({
            fullscreen: true,
            dockedItems: dockedItems,
            html: "<CENTER><BR><BR>첫번째 페이지"
        });
    }
});