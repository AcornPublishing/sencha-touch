Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady: function() {
        var user_model = Ext.regModel('User', {
            fields: [
                {name: 'id', type: 'int'},
                {name: 'name',  type: 'string'},
                {name: 'tel',       type: 'string'}
            ],
            proxy: {
                type: 'ajax',
                url : 'ajaxdata.jsp',               
            
                reader: {
                    type: 'json',
                    root: 'users',

                }
            },            
        });
        
        /*
		var operation = new Ext.data.Operation({
		    action: 'read',
		    start : 50,
		    limit : 25
		});
		user_model.proxy.read(operation);
		*/
                
        var myStore = new Ext.data.Store({
            model: 'User',           		       
            autoLoad: true    
        });

        myStore.sort('id', 'desc');
        //myStore.filter('tel', '010-1111-1111');
        
        console.log(myStore);
             
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
                title: 'Page, Sorter, Filter 처리',
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