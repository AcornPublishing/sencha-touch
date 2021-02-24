Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    
    onReady : function() {

        var maskBodyLoading= new Ext.LoadMask(Ext.getBody(), 
        {
            msg:"Loading..."
            
        });         
        var  maskMyDivLoading;   
 
        panel = new Ext.Panel({
            
            fullscreen:true,

            items:[{ 
                xtype:'spacer'
            },{
                xtype:'button',
                id:'button1',
                text:'mask贸府', 
                height:160,               
                handler:function()
                {
                    maskBodyLoading.show();
                    setTimeout("panel.releaseBodyMask()", 1000);
                }
            },{ 
                xtype:'spacer',
                height:10
            },{
                xtype:'button',
                id:'button2',
                height: 160,
                text:'mask贸府',                
                handler:function()
                {
                    maskMyDivLoading = new Ext.LoadMask( button2, 
                    {
                        msg:"Loading (MyDiv)..."                        
                    });                         
                    maskMyDivLoading.show();
                    setTimeout("panel.releaseDivMask()", 1000);
                }
            },{ 
                xtype:'spacer',
                height:10
            },{
                xtype:'button',
                id:'button3',
                height: 160,
                text:'mask贸府',                
                handler:function()
                {
                    maskMyDivLoading = new Ext.LoadMask( button3, 
                    {
                        msg:"Loading (MyDiv)...",
                        msgCls:"x-loading-spinner",
                        //x-loading-spinner
                        //x-loading-msg
                        //x-loading-grey                        
                    });                         
                    maskMyDivLoading.show();
                    setTimeout("panel.releaseDivMask()", 1000);
                }
            }],
            releaseBodyMask:function()
            {
                maskBodyLoading.hide();                
            },
            releaseDivMask:function()
            {
                maskMyDivLoading.hide();
            }           
        }); 
    
    }
});
