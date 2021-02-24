Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady: function() {
        var action_sheet = new Ext.ActionSheet({
            useTitles: true,
            title:'실행버튼',
            items:[{
            	text:'첫째버튼',
            	ui:'round',
            	handler:function(){
            		Ext.getCmp("text_result").setValue("첫째버튼");
            		action_sheet.hide();
            	}
            },{
            	text:'둘째버튼',
            	ui:'decline',
            	handler:function(){
            		Ext.getCmp("text_result").setValue("둘째버튼");
            		action_sheet.hide();
            	}
            },{
            	text:'세째버튼',
            	ui:'confirm',
            	handler:function(){
            		Ext.getCmp("text_result").setValue("셋째버튼");
            		action_sheet.hide();
            	}
            	
            }]
        });
        
        var action_sheet_small = new Ext.ActionSheet({
            useTitles: true,
            title:'실행버튼',
            items:[{
            	text:'첫째 버튼',
            	ui:'small',
            	handler:function(){
            		Ext.getCmp("text_result").setValue("첫째작은버튼");
            		action_sheet_small.hide();
            	}
            	
            },{
            	text:'둘째버튼',
            	ui:'decline-small',
            	handler:function(){
            		Ext.getCmp("text_result").setValue("둘째작은버튼");
            		action_sheet_small.hide();
            	}
            },{
            	text:'세째버튼',
            	ui:'confirm-small',
            	handler:function(){
            		Ext.getCmp("text_result").setValue("셋째작은버튼");
            		action_sheet_small.hide();
            	}
            }]
	    });
        var panel = new Ext.form.FormPanel({
            fullscreen: true,
            layout: {
               
                align: 'center',
                pack: 'center'
            },
            items: [
            {
					xtype:'textfield',
    				id:'text_result',
    				label:'결과',
    				autoCapitalisze:true,
            },           
            {
                xtype: 'button',
                ui: 'normal',
                text: '큰버튼',
                handler: function() {
                    action_sheet.show();
                }
            },{
                xtype: 'button',
                ui: 'normal',
                text: '작은버튼',
                handler: function() {
                    action_sheet_small.show("pop");
                }
            }]
        });
    }
});