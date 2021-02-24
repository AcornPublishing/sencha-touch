Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    
    onReady: function() {
        
        var SkillList;
        var SkillStore;
        var SkillModel;
        
        Ext.regModel('Skills', {
            fields: ['Skill']
        });     

        SkillStore = new Ext.data.Store({
            model :'Skills',
            data:[
                    // 공백
            ],
        });     
        
        SkillList = new Ext.List({
            id:'SkillList',
            store:SkillStore,                       
            onItemDisclosure: {
                handler: function(record, btn, index) {
                    alert(record.get('Skill') + "선택 index:" + index);
                }
            },
            itemTpl:'<div><strong>{Skill}</strong></div>',
        });        
 
        function getSkillsList(Jv_data) {
            SkillStore = new Ext.data.Store({
                model :'Skills',
                data:Jv_data,
            });
            Ext.getCmp('SkillList').bindStore(SkillStore);  
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
                    text: 'AJAX를 이용해 JSON데이타 가져오기(PROXY제거)',
                    handler: function()
                    {
                        Ext.Ajax.request({
                            url: 'ajaxdata.jsp',
                            success: function(response, opts) {
                                var JsonData = JSON.parse(response.responseText);
                                Ext.getCmp('Name').setValue(JsonData.Name);
                                Ext.getCmp('Age').setValue(JsonData.Age);
                                console.log(JsonData.Skills);
                                console.log(JSON.stringify(JsonData.Skills));
                                getSkillsList(JsonData.Skills);
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