Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    
    onReady: function() {

        new Ext.Panel({
            fullscreen: true,
            id: 'content',
            scroll: 'Agetical',
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: [
                {
                    text: 'AJAX를 이용해 JSON데이타 가져오기',
                    handler: function()
                    {
                        Ext.Ajax.request({
                            url: 'ajaxdata.jsp',
                            success: function(response, opts) {
                                var JsonData = JSON.parse(response.responseText);
                                console.log(response.responseText);
                                console.log(JsonData);
                                Ext.getCmp('ResponseText').setValue(response.responseText);
                                Ext.getCmp('Name').setValue(JsonData.Name);
                                Ext.getCmp('Age').setValue(JsonData.Age);
                                Ext.getCmp('Skill1').setValue(JsonData.Skills[0].Skill);
                                Ext.getCmp('Skill2').setValue(JsonData.Skills[1].Skill);
                                Ext.getCmp('Skill3').setValue(JsonData.Skills[2].Skill);
                                Ext.getCmp('Skill4').setValue(JsonData.Skills[3].Skill);
                                Ext.getCmp('Skill5').setValue(JsonData.Skills[4].Skill);

                            }
                        });                     
                    }
                }]
            }],
            
            items:[
            {
                xtype:'textfield',
                id:'ResponseText',
                label:'JSON값'
                
            },
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
                xtype:'textfield',
                id:'Skill1',
                label:'보유기술1'
                
            },                                    
            {
                xtype:'textfield',
                id:'Skill2',
                label:'보유기술2'
                
            },
            {
                xtype:'textfield',
                id:'Skill3',
                label:'보유기술3'
                
            },            
            {
                xtype:'textfield',
                id:'Skill4',
                label:'보유기술4'
                
            },            
            {
                xtype:'textfield',
                id:'Skill5',
                label:'보유기술5'
                
            },            
            ]
            
        });
    }
});