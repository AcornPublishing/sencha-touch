Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    
    onReady: function() {
        panel = new Ext.form.FormPanel({
            
            id:'panelsubmit',
            fullscreen:true,
            standardSubmit: false,
            
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
                    xtype:'button',
                    text:'submit',
                    handler:function()
                    {   
                        var form = Ext.getCmp('panelsubmit');           
                        form.submit({
                            url: "./submitdata.jsp",
                            waitMsg: 'waiting..',
                            success: function(result, request) {
                                console.log("성공");
                                console.log(result);
                                console.log(request);
                                alert(request.success);
                            },
                            success1: function(result, request) {
                                console.log("성공1");
                                console.log(result);
                                console.log(request);
                                alert(request.success);
                            },
                            failure:function(result, request) {
                                console.log("실패");
                                console.log(result);
                                console.log(request);
                                alert("응답오류");
                            }               
                        });                 
                    }
                }]
            }]
        }); 
      
    }
});