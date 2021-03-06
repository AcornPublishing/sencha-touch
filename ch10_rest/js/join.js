Ext.ns("join");

join.init= function(){
    
    join.panel = new Ext.form.FormPanel({

        id: 'join_panel',
        standardSubmit: true,
        html:'<iframe name="joinHiddenFrame" width="100" height="100" style="visibility:hidden"></iframe>',
        
        layout: {
            type: 'vbox',
            pack: 'center',
            align: 'stretch'
        },
                                
        items:[{
            xtype: 'fieldset',
            title: '가입하기',
            instructions: '아이디, 암호, 이름을 입력하십시오',
            defaults: {
                required: true,
                labelAlign: 'left',
                labelWidth: '40%'
            },
            items:[
                {
            xtype:'hiddenfield',
            name:'inpUrl',
            value:'http://127.0.0.1:8080/book/ch10_rest/response.html',
        },          
            {            
                xtype:'textfield',
                name:'user_id',
                label:'아이디',
                placeHolder:'아이디',
                autoCapitalisze:true,
                useClearIcon:false
            },{
                xtype:'passwordfield',
                name: 'user_pwd',
                placeHolder:'영문자혼합 6자',
                label: '암호',
                useClearIcon:true
            },{            
                xtype:'textfield',
                name:'user_name',
                label:'이름',
                placeHolder:'이름',
                autoCapitalisze:true,
                useClearIcon:false
            },{
                xtype: 'urlfield',
                id: 'fileAttach',
                name: 'user_img',
                label: '프로필사진',
                inputType: 'file'
            },{
                xtype:'button',
                text:'가입하기',
                handler:function()
                {
                    
                    Ext.getDom('join_panel').enctype='multipart/form-data';                 
                    Ext.getDom('join_panel').target='joinHiddenFrame';  
                    var form = Ext.getCmp('join_panel');
                    form.submit({
                         url: '/RestService/jersey/login/create',
                        waitMsg: 'waiting..',
                                    success: function(result, request) {
                                        console.log("성공");
                            console.log(result);
                            console.log(request);
                        },
                        failure:function(result, request) {
                                        console.log("실패");
                            console.log(result);
                            console.log(request);
                        }                   
                    }
                    
                    );  
                    setTimeout('join.panel.check()', 1000);             
                }
            }]
           }], 
           check:function()
           {
                
                console.log(document.joinHiddenFrame);
                if(document.joinHiddenFrame)
                {
                    setTimeout('join.panel.check()', 5000);
                }
           }        
    }); 
}



