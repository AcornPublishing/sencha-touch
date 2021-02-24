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
		
		var operation = new Ext.data.Operation({
			action:'read',
			page: 1,
			start:2,
			limit:2
		});
		
		var myStore = new Ext.data.Store({
		    model: 'User',
			pageSize:2,
			currentPage:1,
	        proxy: {
	        type: 'ajax',
	        url : 'ajaxdata.jsp',
            pagePage:'pageNumber',
            startParam:'startIndex',
            limitParam:'limitIndex',	        
		        reader: {
		            type: 'json',
		            root: 'users',

		        }
		    },
		    autoLoad: true
		});
        
        myStore.proxy.read(operation);
        myStore.load();
             
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
                title: 'PROXY 기본',
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