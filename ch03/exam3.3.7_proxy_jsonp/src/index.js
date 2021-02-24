Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady: function() {
        Ext.regModel('User', {
            fields: [
                {name: 'id', type: 'int'},
                {name: 'name',  type: 'string'},
                {name: 'tel',       type: 'string'}
            ],
        });

        myStore = new Ext.data.Store({
            model :'User',               
            data:[
                    // 공백
            ],
        }); 
                    
        Ext.util.JSONP.request({
            url:'http://127.0.0.1:8080/book/ch03/exam3.3.7_proxy_jsonp/ajaxdata.jsp',
            callbackKey:'callback111',
            root:'users',
            callback:function(response)
            {
                console.log(response);
                data =  response.users;
                setUsers(data);
            }
        });

        list = new Ext.List({
            store:myStore,
            height:'400',
            itemTpl:'<div>{id} {name} {tel} </div>',
        });        

        new Ext.Panel({
            fullscreen: true,
            layout:'fit',
            id: 'content',
            scroll: 'Agetical',
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                title: 'JSONP 처리',
            }],
            items:[
            {
                xtype:'fieldset',
                instructions: 'JSONP 알아보기',
                items:list,
            }]
            
        });
        setUsers = function(Jv_data) {
            myStore = new Ext.data.Store({
                model :'User',
                data:Jv_data,
            });
            list.bindStore(myStore);            
        };        
    }
});