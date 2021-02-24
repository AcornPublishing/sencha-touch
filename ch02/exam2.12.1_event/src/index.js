

Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,

    onReady: function() {
        
        event_panel = new Ext.Panel({
            layout:{
                type:'vbox',
                align:'stretch',
            },          
            html:"event occur!!",
            style:"background-color:yellow",        
        });
        
        event_panel.addListener({
            body:{
                tap:function(e){
                    panel.fireEvent('tap', e.type, e);                 
                    Ext.getCmp("event_text").setValue(
                        Ext.getCmp("event_text").getValue() + '>');
                    
                }
            },
            scope:this
        });
        
        
        panel = new Ext.Panel({
            fullscreen: true,
            id: 'content',
           
            layout:{
                type:'auto',
                align:'stretch',
            },

            
            items:[event_panel,
            {
                xtype:'textfield',
                id:'event_text',
                value:'>',
                
            }]
            
        });
		panel.addListener({
			tap:function()
			{
				alert('event_panel로부터 이벤트를 받았습니다.');
			}
		});
        
    }
});