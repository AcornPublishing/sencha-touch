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
            hasMany:{model:'Hobby',  name:'hobby'}
        });
    
        Ext.regModel('Hobby', {
            fields: [
                {name: 'play', type: 'string'},
                {name: 'tv',  type: 'string'}
            ],
            belongsTo: 'User'
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
            itemTpl:'<tpl for=".">' + 
                '<div>{id} {name} {tel} ' +                     
                '<tpl for="hobby">' + 
                '<div><font color="blue"><small>{play} {tv}</small></font></div>' + 
                '</tpl></div></tpl>',
        });        

        new Ext.Panel({
            fullscreen: true,
            layout:'fit',
            id: 'content',
            scroll: 'Agetical',
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                title: '복잡한 데이터 처리',
            }],
            items:[
            {
                xtype:'fieldset',
                instructions: '복잡한 데이터 알아보기',
                items:list,
            }]
            
        });
    }
});