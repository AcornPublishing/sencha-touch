Ext.ns("main");
Ext.ns("main.MainPanel");

Ext.setup({
    icon: 'icon.png',
    glossOnIcon: false,
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    onReady: function() {
        main.initMainPanel();
                
        main.MainPanel.layout.setActiveItem(menu.panel_menu, "flip"); 
        menu.panel_menu.getNoticeList();  
    }
});

main.initMainPanel = function()
{
    main.MainPanel = new Ext.Panel({
        fullscreen: true,
        id:'MainPanel',
        cardSwitchAnimation:"flip",
        layout:'card',          
        
        dockedItems :[{
            id:'main.toolbar',
            dock: 'bottom',
            xtype: 'toolbar',             
            layout: {
                type: 'hbox',
                pack: 'center',
            },
            items: [
                { 
                    cls:'Login',
                    //iconMask: true,
                    text: '<div align="center"><img src="./img/power_on.png">Login</div>', 
                    //text: 'Login' ,
                    handler: function(btn,event){
                        main.MainPanel.layout.setActiveItem(login.panel_login, 'flip'); 
                    }               
                },               
                {   
                    cls:'Search',
                    text: '<div align="center"><img src="./img/user_list.png">Search</div>',
                    handler: function(btn,event){
                        list.init();
                        main.MainPanel.layout.setActiveItem(list.panel_list, 'flip');    
                    }
                },
                {   
                    cls:'Chart',
                    text: '<div align="center"><img src="./img/piechart.png">Chart</div>',
                    handler: function(btn,event){
                        chart.init();
                        chart.panel_chart.getChartList();
                        main.MainPanel.layout.setActiveItem(chart.panel_chart);     
                    }                
                }
            ]
        },
        {
            dock: 'top',
            xtype: 'toolbar',
            title: '¸ð¹ÙÀÏ THIN ',
            items: [
            {
                cls:'home',
                iconMask: true,
                iconCls:'home',
                text: '',
                handler: function(btn,event){
                        
                        main.MainPanel.layout.setActiveItem(menu.panel_menu, "flip", 'flip'); 
                        menu.panel_menu.getNoticeList();  
                }
            }]
        }], 
    }); 
   
}

