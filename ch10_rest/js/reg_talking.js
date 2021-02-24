Ext.ns("reg_talking");

reg_talking.panel = new Ext.form.FormPanel({
    useCurrentLocation: true,               
    scroll:'vertical',
    cardSwitchAnimation:"cube",
    id: 'reg_talking_panel',
    standardSubmit: false,   
    items:[{
        xtype: 'fieldset',
        title: '글쓰기',
        instructions: '내용을 입력하세요',
     
        defaults: {
            required: true,
            labelAlign: 'left',
            labelWidth: '0'
        },
        items:[
        {
            xtype:'hiddenfield',
            name:'user_id',
            value: common.users.getUserId(),
        },  
        {
            xtype:'hiddenfield',
            name:'reg_kind',
            value:'1',
        },        
            {
            xtype:'hiddenfield',
            name:'inpUrl',
            value:'1',
        },  
        {
            
            xtype:'textareafield',
            id:'reg_talking.content',
            name:'content',
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
                    var form = Ext.getCmp('reg_talking_panel');            
            form.submit({
                            url: '/RestService/jersey/twit/createnoimg',
                        success: function(result, request) {
                               
                               alert('등록하였습니다.');
                                        talking.init();
                                        main.panel.layout.setActiveItem(talking.panel);
                                        talking.panel.refreshAll();  ;
                },
                failure:function(result, request) {
                                console.log("실패");
                               alert('실패하였습니다.');
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