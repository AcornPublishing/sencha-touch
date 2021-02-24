Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    
    onReady: function() {
        panel = new Ext.form.FormPanel({
            fullscreen:true,
            id: 'panel_submit',
            standardSubmit: true,
            html:'<iframe name="hiddenFrame" width="0" height="0"></iframe>',
            items: [
            {
                xtype: 'fieldset',
                title: 'SUBMIT...',
                instructions: 'Submit 테스트입니다.',
                defaults: {
                    required: true,
                    labelAlign: 'left',
                    labelWidth: '150'
                },  
                items:
                [
                {
                    xtype:'textfield',
                    name:'user_id',
                    label:'ID',                 
                },  
                {
                    xtype:'textfield',
                    name:'user_name',
                    label:'이름',
                },          
                {
                    xtype: 'urlfield',
                    id: 'fileAttach',
                    name: 'fileAttach',
                    label: 'Upload File',
                    inputType: 'file'
                },
                {
                    xtype:'button',
                    text:'submit',
                    handler:function()
                    {
                        Ext.getDom('panel_submit').enctype='multipart/form-data';                   
                        Ext.getDom('panel_submit').target='hiddenFrame';    
                        var form = Ext.getCmp('panel_submit');                      
                        form.submit({
                            url: "./submitdata.jsp",
                            waitMsg: 'waiting..',
                
                        });                 
                    }
                }]
            }]
        }); 
      
    }
});