Ext.ns("sencha");

Ext.setup({
    icon: 'icon.png',
    glossOnIcon: false,
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    onReady: function() {
        sencha.panel = new Ext.form.FormPanel({
            width:400,
            height:250,
            title:'Sencha Touch',
            renderTo: 'show_div',
            items: [
                    {
                    xtype: 'fieldset',
                    title: 'Sencha Touch',
                    instructions: 'Sencha Touch 영역',
                    items:[
                    {   xtype: 'spacer',
                        height: 50
                    },
                    {                   
                        xtype: 'button',
                        id:'button1',
                        width:200,
                        name : 'name',
                        text:  'Sencha Touch 버튼',
                        handler:function()
                        {
                            callHtml();
                        }                       
                    },
                    {   xtype: 'spacer',
                        height: 50
                    }]
                }
            ],
            callSenchaTouch:function()
            {
                alert('여기는 Sencha Touch 입니다.');
            }
            
        });
    }
})