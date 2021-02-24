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
            ]
        });
        
        var myStore = new Ext.data.Store({
            model: 'User',
            proxy: {
                type: 'ajax',
                url : 'ajaxdata.jsp',
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
                title: '서버연동의  기본',
            }],
            items:[
            {
                xtype:'fieldset',
                instructions: 'PROXY 알아보기',
                items:list,
            }]
            
        });
    }
});