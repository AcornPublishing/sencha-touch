Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    
    onReady: function() {
        
        var empList;
        var empStore;
        var empStorageStore;
        var empProxy;
        var empModel;


        empModel = Ext.regModel('emps', {
            fields: ['num', 'name']
        });            

        empStorageStore = new Ext.data.Store({
            model:'emps',
            autoLoad:true,
            autoSave:true,
            proxy:{
                type:'localstorage',
                id: 'empsStoreStorage'
            }
        });    
         
        empList = new Ext.List({
        	height:400,
            //store:empStore,
            store:empStorageStore,
            SelectedItemCls:'x-list-oAge',
            onItemDisclosure: {
                handler: function(record, btn, index) {
                    alert(record.get('name') + "을 삭제합니다.");
                    empStorageStore.removeAt(index);
                    empStorageStore.sync();
                    empList.bindStore(empStorageStore);  
                }
            },
            itemTpl:'<div><strong>{num}</strong>{name}</div>',
        });        
		empStorageStore.load();
		empList.bindStore(empStorageStore);          
		
        function getRankingList() {
            empProxy    =new Ext.data.AjaxProxy({
                url: 'ajaxdata.jsp',
                type:'ajax',               
                reader:{
                    type:'json',
                    root:'emps',
                }
            });         
            empStore = new Ext.data.Store({
                encode:true,
                autoLoad:true,
                fields:[
                    {name:'num', type:'string'},
                    {name:'name', type:'string'}
                ],
                proxy: empProxy               
            });
            console.log("------------");
            
            empStore.load();
            empList.bindStore(empStore);  
            console.log(empStore.data);  
        };

        new Ext.Panel({
            fullscreen: true,
            id: 'content',
            scroll: 'Agetical',
            dockedItems: [
            {
                xtype: 'toolbar',
                dock: 'top',
                items: [
                {
                    text: '조회',
                    handler: function()
                    {
                        Ext.Ajax.request({
                            url: 'ajaxdata.jsp',
                            success: function(response, opts) {
                                var JsonData = JSON.parse(response.responseText);
                                getRankingList();
                                
                            }
                        });                     
                    }
                },
                {
                    text: '저장',
                    handler: function()
                    {
                    	console.log(empStore);
                    	for(i=0; i< empStore.data.length;i++)    
                    	{                	
							empStorageStore.add(empStore.data.items[i].data);
							console.log(empStore.data.items[i].data);
						}	
						empStorageStore.sync();
						empList.bindStore(empStorageStore);  
                    }                	

                },
                {
                    text: '불러오기',
                    handler: function()
                    {                    	
			            //empStorageStore.load();
			            empList.bindStore(empStorageStore);  
						                
                    }
                },
                {
                    text: '삭제',
                    handler: function()
                    {
			            empStorageStore.removeAll();
			            empStorageStore.sync();
			            empList.bindStore(empStorageStore);  
                    }
                }]
            }],
            items:[
            {
            	
                xtype:'fieldset',
                instructions: '리스트를 조회합니다.',
                items:empList,                
            }]
            
        });
    }
});