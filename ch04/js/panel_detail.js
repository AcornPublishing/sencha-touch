Ext.ns("detail");


detail.panel_detail = new Ext.form.FormPanel({
    useCurrentLocation: true,               
    scroll:'vertical',
    cardSwitchAnimation:"slide",
    width: '100%',
    input_user_id:'',
    setUserId:function(user_id)
    {
        this.input_user_id = user_id;
    },
    
    getUserInfo:function()
    {
        Ext.Ajax.request({
            url: './jsp/psn_detail.jsp?user_id=' + this.input_user_id,
            success: function(response, opts) {
                console.log(response.responseText);
                var JsonData = JSON.parse(response.responseText);
                console.log(JsonData);
                if(JsonData.data.err == "")
                {
                    detail.panel_detail.setPersonFields(JsonData.data.psn_detail);
                }
                else
                {
                    alert(JsonData.data.err);
                }
                
            }
        });         
    },  
    
    setPersonFields:function(psnDetail)
    {
        Ext.getCmp("user_id").setValue(psnDetail.user_id);
        Ext.getCmp("panel_detail.user_name").setValue(psnDetail.user_name);
        Ext.getCmp("tel").setValue(psnDetail.tel);
        Ext.getCmp("adr").setValue(psnDetail.adr);
        Ext.getCmp("panel_detail.user_pic").update( '<table width="100%"><tr><td><img src="./img/' + psnDetail.user_id +  '.png" height="100"></td><td><a href="tel:' + psnDetail.tel+ '"><img src="./img/tel.jpg" height="80"></a></td></tr></table> ');
        
    },
    layout: {
        type: 'vbox',
        pack: 'center',
        align: 'stretch'
    },
    scroll: 'vertical',                         
    items:
    [{
        xtype: 'fieldset',
        title: '직원 조회',
        //instructions: '직원명을 입력하시고 조회버튼을 클릭하십시요',
        pack: 'center',
        defaults: {
            required: true,
            labelAlign: 'left' 
        },
        items:[
            {
                xtype:'panel',
                id:'panel_detail.user_pic',
                //height:'30%',
                xtype: 'fieldset',
                html:'<img src="./img/01234567.png" height="100">',            
            },        
            {
                xtype:'textfield',
                label:'직원번호',
                id:'user_id',               
                placeHolder:'직원번호',
                autoCapitalisze:true,
                useClearIcon:false
                            
            },{
                xtype:'textfield',
                label:'직원번호',
                id:'user_id',               
                placeHolder:'직원번호',
                autoCapitalisze:true,
                useClearIcon:false
                            
            },            
            {
                xtype:'textfield',
                id:'panel_detail.user_name',
                label:'직원명',
                placeHolder:'직원명',
                autoCapitalisze:true,
                useClearIcon:false
                            
            },    
            {
                xtype:'textfield',
                id:'tel',
                label:'전화번호',
                placeHolder:'전화번호',
                autoCapitalisze:true,
                useClearIcon:false                          
            },           
            {
                xtype:'textareafield',
                id:'adr',
                label:'주소',
                placeHolder:'주소',
                //autoCapitalisze:true,
                useClearIcon:false,
                //maxRows : 2
                            
            }, 
            {
                xtype:'button',
                ui: 'decline-round',
                text:'닫기',
                align:'center',
                name:'button_close',
                width:'30%',
                handler:function(){                                     
                   main.MainPanel.layout.setActiveItem(list.panel_list); 
                },
                text:'목록'
            }]                                  
    }]
});     
