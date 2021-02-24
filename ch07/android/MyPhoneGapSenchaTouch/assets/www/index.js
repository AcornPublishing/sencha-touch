Ext.ns("phonegap_sencha");

Ext.setup({
    icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: false,
    onReady: function() {
        var count = 0;
        phonegap_sencha.panel = new Ext.TabPanel({
            tabBar: {
                dock: 'bottom',
                layout: {
                    pack: 'center'
                }
            },
            fullscreen: true,
            ui: 'light',
            cardSwitchAnimation: {
                type: 'cube',
            },
            iconAlign:'left',
            defaults: {
                scroll: 'vertical'
            },
            getGeo:function(position)
            {
            	alert("PheneGap으로 부터 받은 위치:" + position.coords.latitude + "," +  position.coords.longitude );
            },
            items: [{
                title: 'About',
                html: '<center><font size="64" color="red"><BR>1<BR>첫번째 </font></center>',
                iconCls: 'info',
                
                cls: 'card1',
             
            }, {
                title: 'Favorites',
                html: '<center><font size="64" color="red"><BR>2<BR>두번째 </font></center>',
                iconCls: 'favorites',
                cls: 'card2',
               
                
            }, {
                title: 'Downloads',
                id: 'tab3',
                html: '<center><font size="64" color="red"><BR>3<BR>세번째 </font></center>',
                
                cls: 'card3',
                iconCls: 'download',

            }, {
                title: 'Settings',
                html: '<center><font size="64" color="red"><BR>4<BR>네번째 </font></center>',
                cls: 'card4',
                iconCls: 'settings',

            }, {
                title: 'User',
                html: '<center><font size="64" color="red"><BR>5<BR>다섯번째 </font></center>',
                cls: 'card5',
                iconCls: 'user',

            }],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                layout: {
                    pack: 'center'
                },
                defaults: {
                    iconMask: true,
                },
                items: [
                { 
                    text:'카메라',    
                    handler:function()
                    {
						callCamera();
                    }               
                },
                { 
                    text:'위도경도',    
                    handler:function()
                    {
						callLocationPos();
                    }               
                },
                { 
                    text:'파일Upload',    
                    handler:function()
                    {
						callFileUpload();
                    }               
                }]
            }]            
        });
    }    
});