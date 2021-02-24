Ext.setup({
    icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: false,
    onReady: function() {
        var count = 0;
        var panel = new Ext.CardPanel({
            
            fullscreen: true,
	            cardSwitchAnimation: {
	                type: 'cube',
	               
	                //cover: true
	            },
	            iconAlign:'left',
	            defaults: {
	                scroll: 'vertical'
	            },
            dockedItems: [
            {
            	xtype: 'tabbar',
                dock: 'bottom',
                layout: {
                    pack: 'center'
                },
	            ui: 'light',

	            items: [{
	                title: 'About',
	                html: '<center><font size="64" color="red"><BR>1<BR>첫번째 </font></center>',
	                iconCls: 'info',
	                
	                cls: 'card1',
	                handler:function()
	                {
	                    count = 0;
	                }                
	            }, {
	                title: 'Favorites',
	                html: '<center><font size="64" color="red"><BR>2<BR>두번째 </font></center>',
	                iconCls: 'favorites',
	                cls: 'card2',
	                badgeText: '뱃찌',
	                handler:function()
	                {
	                    count = 1;
	                }                
	                
	            }, {
	                title: 'Downloads',
	                id: 'tab3',
	                html: '<center><font size="64" color="red"><BR>3<BR>세번째 </font></center>',
	                badgeText: '뱃지를 하나더...',
	                cls: 'card3',
	                iconCls: 'download',
	                handler:function()
	                {
	                    count = 2;
	                }                
	                
	            }, {
	                title: 'Settings',
	                html: '<center><font size="64" color="red"><BR>4<BR>네번째 </font></center>',
	                cls: 'card4',
	                iconCls: 'settings',
	                handler:function()
	                {
	                    count = 3;
	                }                
	                
	            }, {
	                title: 'User',
	                html: '<center><font size="64" color="red"><BR>5<BR>다섯번째 </font></center>',
	                cls: 'card5',
	                iconCls: 'user',
	                handler:function()
	                {
	                    count = 4;
	                }                
	                
	            }],                
            },            
            {
                xtype: 'toolbar',
                dock: 'top',
                defaults: {
                    ui: 'plain'
                },
                scroll: 'horizontal',
                layout: {
                    pack: 'center'
                },
                defaults: {
                    iconMask: true,
                    ui: 'plain'
                },
                items: [
                 { 
                    iconMask: true, 
                    ui: 'back', 
                    text:'back',    
                    handler:function()
                    {
                        console.log(tabpanel);
                        count = count-1;
                        if(count<0)
                            count = 4;
                        if(count >4)
                            count = 0;
                        tabpanel.setActiveItem(count);
                    }               
                },
                { 
                    iconMask: true, 
                    ui: 'forward', 
                    text:'forward',         
                    handler:function()
                    {
                        count= count+1;
                        if(count<0)
                            count = 4;
                        if(count>4)
                            count = 0;
                        tabpanel.setActiveItem(count);
                    }               
                },
                ]
            }]            
        });
        function toolbarHandler()
        {
            alert('toolbar가 눌렸습니다.');
        }
    
    }    

});