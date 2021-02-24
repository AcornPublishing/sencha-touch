Ext.setup({
    icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: false,
    onReady: function() {
        var count = 0;
        var panel = new Ext.Panel({
            fullscreen: true,
            html:'<BR><BR><BR><center>ToolBar에 대해서...<BR>',
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items:[{
                    iconCls: 'info',
                    iconMask: true, 
                    text:'INFOMATION',
                },{
                    iconCls: 'favorites',
                    iconMask: true, 
                    iconAlign:'top',
                    text:'INFOMATION',
                },]    
            },{
                layout: {
                    type: 'hbox',
                    pack: 'center',
                },
                xtype: 'toolbar',
                height:'60',
                dock: 'bottom',
                items:[{
                	height:'40',
                    text: '<img src="./img/arrow_left.png">',
                },{
                	height:'40',
                    text: '<img src="./img/posol.png" >',
                },]    
            },{
                xtype: 'toolbar',
                dock: 'left',
                ui:'light',
                id:'leftButton',
                items:[{
                    text: '<',
                    handler:function()
                    {
                    	Ext.getCmp("leftButton").hide();
                    }
                }]    
            },{
                xtype: 'toolbar',
                dock: 'right',
                ui:'light',
                items:[{
                    text: '>',
                }]    
            }]            
        });
        function toolbarHandler()
        {
            alert('toolbar가 눌렸습니다.');
        }    
    } 
});