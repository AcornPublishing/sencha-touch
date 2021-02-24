Ext.ns("main");

Ext.setup({
    icon: 'icon.png',
    glossOnIcon: false,
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    onReady: function() {
        main.init();
        main.MainPanel.layout.setActiveItem(login.panel_login);
    }
});

main.init = function()
{
    main.MainPanel = new Ext.Panel({
        fullscreen: true,
        id:'MainPanel',
        
        cardSwitchAnimation:"slide",
        layout:'card',          
        
        dockedItems :[{
            dock: 'bottom',
            xtype: 'toolbar',
 			layout: {
                type: 'hbox',
                align: 'center',
                pack: 'center'
            },            
            items: [
           
            { 
                cls:'Login',
                iconMask: true,
                iconAlign:'top',
                iconCls: 'user', 
                text: 'Login' ,
                handler: function(btn,event){
                    main.MainPanel.layout.setActiveItem(login.panel_login); 
                }               
            },
            { 
                cls:'Mail',
                iconMask: true,
                iconCls: 'bookmarks', 
                iconAlign:'top',
                text: 'Mail' ,
                handler: function(btn,event){
                    mail.init();
                    mail.panel_mail.getMailList();
                    main.MainPanel.layout.setActiveItem(mail.panel_mail);                
                }
            },
            {   
                cls:'Search',
                iconMask: true,
                iconCls: 'search', 
                iconAlign:'top',
                text: 'Search' ,
                handler: function(btn,event){
                    list.init();
                    main.MainPanel.layout.setActiveItem(list.panel_list);    
                }
            },
            { 
                cls:'Map',
                iconMask: true,
                iconCls: 'favorites', 
                iconAlign:'top',
                text: 'Map' ,
                handler: function(btn,event){
                    map.init();
                    main.MainPanel.layout.setActiveItem(map.panel_map);   
                } 
            }]
        },
        {
            dock: 'top',
            xtype: 'toolbar',
            title: '¸ð¹ÙÀÏ WEB',
            items: [
            {
                cls:'home',
                iconMask: true,
                iconCls:'home',
                text: '',
                handler: function(btn,event){
                        mail.init();
                        mail.panel_mail.getMailList();
                        main.MainPanel.layout.setActiveItem(mail.panel_mail,"fade");   
                }
            }]
        }], 
    }); 
   
}

