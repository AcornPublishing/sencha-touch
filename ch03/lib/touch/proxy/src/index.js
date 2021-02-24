Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    
    onReady: function() {
               
        var list;
        var store;
        var proxy;

        Ext.regModel('Data', {idProperty: 'id', fields:[ 'id','name','tel']} );

        store = new Ext.data.JsonStore({

        	model:'Data',
        	
			autoload:true,
            proxy: {
            	type:'ajax',
            	url:'ajaxdata.jsp'
            },
        });   
        store.load();
        
        console.log(store);

             
        list = new Ext.List({
            store:store,
            height:'400',
            itemTpl:'<div>{id} {name} {tel}</div>',
        });        
        


        new Ext.Panel({
            fullscreen: true,
            layout:'fit',
            id: 'content',
            scroll: 'Agetical',
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                title: 'PROXY',
            }],
            items:[
            {
                xtype:'fieldset',
                instructions: '리스트를 조회합니다.',
                items:list,
            }]
            
        });
    }
});