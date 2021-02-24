

Ext.apply( Ext.anims ,{
    rotate: new Ext.Anim({
        before: function(el) {
            this.from = {
                '-webkit-transform': 'rotate(0deg)',

            };
            this.to = {
                '-webkit-transform': 'rotate(360deg)'
            };
        }
    })
});

Ext.setup({
    icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: false,
    onReady: function() {

        var panel_ani = new Ext.Panel({
            width:200,
            height:200,
            html:'<img src="./img/bug.png" width="180" height="180">',
        });
        var panel = new Ext.Panel({
            fullscreen: true,
            dockedItems: [
                {
                   dock : 'top',
                    xtype: 'toolbar',
                    items:[
                        {
                            xtype:'button',
                            text:'MOVE',
                            handler:function()
                            {
                                Ext.Anim.run(panel_ani, 'slide', {
                                    direction:'down',
                                    duration:1000
                                });                 
                            }
                        },
                        {
                            xtype:'button',
                            text:'FLIP',
                            handler:function()
                            {
                                Ext.Anim.run(panel_ani, 'flip', {
                                    duration:1000
                                });                 
                            }
                        },
                        {
                            xtype:'button',
                            text:'CUBE',
                            handler:function()
                            {
                                Ext.Anim.run(panel_ani, 'cube', {
                                    duration:1000
                                });                 
                            }
                        },
                        {
                            xtype:'button',
                            text:'FADE',
                            handler:function()
                            {
                                Ext.Anim.run(panel_ani, 'fade', {
                                    duration:1000
                                });                 
                            }
                        },
                        {
                            xtype:'button',
                            text:'ROTATE',
                            handler:function()
                            {
                                Ext.Anim.run(panel_ani, 'rotate',{});  
                            }
                        }                                                                              
                    ]                    
                }                          
            ],
            items:panel_ani            
        });    
    }
});
