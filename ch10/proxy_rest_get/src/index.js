Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady: function() {
        Ext.regModel('Data', {
            fields: 
                [{name: 'result', type: 'String'}]
            ,
            proxy: {                
                type: 'rest',
                url:'/RestService/jersey/helloworld',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            },          
        });

	 var store = new Ext.data.Store({
	    model: 'Data'
	});     
	store.load(); //GET /users
	
	//2. Load directly from the Model
	
	//GET /users/123
	Ext.ModelMgr.getModel('Data').load('123', {
	    success: function(user) {
	        console.log(user); //outputs 123
	    }
	});
		
		             
        list = new Ext.List({
            store:store,
            height:'400',
            itemTpl:'<div>{result} </div>',
        });        

        new Ext.Panel({
            fullscreen: true,
            layout:'fit',
            id: 'content',
            scroll: 'Agetical',
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                title: 'REST서비스 연동',
            }],
            items:[
            {
                xtype:'fieldset',
                instructions: 'Rest Proxy',
                items:list,
            }]
            
        });
    }
});