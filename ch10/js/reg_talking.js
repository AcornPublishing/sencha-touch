Ext.ns("reg_talking");

reg_talking.panel = new Ext.form.FormPanel({
    useCurrentLocation: true,               
    scroll:'vertical',
    cardSwitchAnimation:"cube",
                    
    items:[{
        xtype: 'fieldset',
        title: '글쓰기',
        instructions: '내용을 입력하세요',
        defaults: {
            required: true,
            labelAlign: 'left',
            labelWidth: '0'
        },
        items:[{
            
            xtype:'textareafield',
            id:'reg_talking.content',
            label:'',
            placeHolder:'글쓰기',
        },{
            layout: {
                type: 'hbox',
                pack: 'center',
            },  
            flex: 2, style: 'margin: .5em;',                
            items:[{
                xtype:'button',
                ui: 'decline-round',
                name:'regtalking.reg',
                handler:function(){                 
                    Ext.Ajax.request({
                        url: './jsp/sns_talking_reg.jsp?user_id=' + 
                        common.users.getUserId() + 
                        '&content=' + 
                        Ext.getCmp("reg_talking.content").getValue(),
                        success: function(response, opts) {
                            var JsonData = JSON.parse(response.responseText);
                            if(JsonData.data.err == "")
                            {
                                    alert('등록하였습니다.');
                                    talking.init();
                                    main.panel.layout.setActiveItem(talking.panel);
                                    talking.panel.refreshAll();    
                            }
                            else
                            {
                                alert(JsonData.data.err);
                            }                            
                        }
                    });                     
                },    
                text:'등록'
            },{ 
                            xtype:'spacer',width:'10%'
            },{
                xtype:'button',
                ui: 'decline-round',
                name:'reg_talking.close',
                text:'취소',
                handler:function(){   
            main.panel.layout.setActiveItem(talking.panel); 
                    talking.panel.refreshAll();                     
                }
            }]                                       
        }]
    }],         
}); 