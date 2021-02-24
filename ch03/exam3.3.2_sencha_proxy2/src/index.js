Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    
    onReady: function() {
        
        var SkillList;
        var SkillStore;
        var SkillProxy;
        var SkillModel;

        Ext.regModel('Skills', {
            fields: ['Skill']
        });     

        SkillProxy = new Ext.data.AjaxProxy({
            type:'ajax',
            reader:{
                type:'json',
                //Skill:"Skill",
                root:'Skills',
            }
        });         
        
        SkillStore = new Ext.data.Store({
            encode:true,
            autoLoad:true,
            fields:[
                {name:'Skill', type:'string'}
            ],
            proxy: SkillProxy               
        });   
             
        SkillList = new Ext.List({
            store:SkillStore,
            
            SelectedItemCls:'x-list-oAge',
            onItemDisclosure: {
                handler: function(record, btn, index) {
                    alert(record.get('Skill') + "선택 index:" + index);
                }
            },
            itemTpl:'<div><strong>{Skill}</strong></div>',
        });        
        
        function getRankingList() {
            SkillProxy    =new Ext.data.AjaxProxy({
                url: 'ajaxdata.jsp',
                type:'ajax',               
                reader:{
                    type:'json',
                    root:'Skills',
                }
            });         
            SkillStore = new Ext.data.Store({
                encode:true,
                autoLoad:true,
                fields:[
                    {name:'Skill', type:'string'}
                ],
                proxy: SkillProxy               
            });
            SkillStore.load();
            SkillList.bindStore(SkillStore);    
        };

        new Ext.Panel({
            fullscreen: true,
            id: 'content',
            scroll: 'Agetical',
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: [
                {
                    text: 'PROXY를 사용해 데이터 가져오기',
                    handler: function()
                    {
                        Ext.Ajax.request({
                            url: 'ajaxdata.html',
                            success: function(response, opts) {
                                var JsonData = JSON.parse(response.responseText);
                                Ext.getCmp('Name').setValue(JsonData.Name);
                                Ext.getCmp('Age').setValue(JsonData.Age);
                                getRankingList();
                                
                            }
                        });                     
                    }
                }]
            }],
            items:[
            {
                xtype:'textfield',
                id:'Name',
                label:'이름'
                
            },
            {
                xtype:'textfield',
                id:'Age',
                label:'나이'
                
            },
            {
                xtype:'fieldset',
                instructions: '리스트를 조회합니다.',
                items:SkillList,                
            }]
            
        });
    }
});