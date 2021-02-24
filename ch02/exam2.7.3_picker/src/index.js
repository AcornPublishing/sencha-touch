Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady: function() {
        var date_picker = new Ext.DatePicker({
            useTitles: true,
            
            value: {
                day: 18,
                month: 4,
                year: 2011
            },
            listeners:{
            	"hide":function(picker){
            		console.log(Ext.getCmp("date_field"));
            		Ext.getCmp("date_field").setValue(picker.getValue().format('Y-m-d'));
            	}
            }                        
        });
     
		var degree_picker = new Ext.Picker({
		    slots: [
		        {
		            name : 'degree_data',
		            title: '고객등급',
		            data : [
		                {text: '홍길동', value: 'VIP'},
		                {text: '임걱정', value: 'VIP'},
		                {text: '나비야', value: '우량'},
		                {text: '푸르른', value: '일반'}
		            ]
		        }
		    ],
            listeners:{
            	"hide":function(picker){
            		//console.log(Ext.getCmp("degree_field"));
            		console.log(picker.getValue().degree_data);
            		Ext.getCmp("degree_field").setValue(picker.getValue().degree_data);
            		
            	}
            }  		    
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
    				id:'degree_field',
    				label:'고객등급',
    				placeHolder:'버튼 클릭!!',
    				autoCapitalisze:true,
    				useClearIcon:false
            },           
            {
                xtype: 'button',
                ui: 'normal',
                text: '고객등급',
                handler: function() {
                    degree_picker.show();
                }
            },            
            {
					xtype:'textfield',
    				id:'date_field',
    				label:'날짜',
    				placeHolder:'버튼 클릭!!',
    				autoCapitalisze:true,
    				useClearIcon:false
            },           
            {
                xtype: 'button',
                ui: 'normal',
                text: '날짜',
                handler: function() {
                    date_picker.show();
                }
            },

            ]
        });
    }
});