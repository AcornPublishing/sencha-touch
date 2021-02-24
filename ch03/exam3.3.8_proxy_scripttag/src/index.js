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
        
        var myStore = new Ext.data.Store({
            model: 'User',
            proxy: {
                type: 'scripttag',
                url : 'http://127.0.0.1:8080/book/part3/3.3.8_proxy_scripttag/ajaxdata.jsp',
                reader: {
                    type: 'json',
                    root: 'users'
                }
            },  
            autoLoad: true
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
                title: 'SCRIPT TAG 처리',
            }],
            items:[
            {
                xtype:'fieldset',
                instructions: 'ScriptTag 알아보기',
                items:list,
            }]
            
        });
    }
});