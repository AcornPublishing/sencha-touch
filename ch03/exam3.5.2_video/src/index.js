

Ext.setup({
    icon: 'icon.png',
    glossOnIcon: false,
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    onReady: function() {

		new Ext.form.FormPanel({
	        fullscreen: true,
	        
	    	layout: {
				type: 'vbox', 
				pack: 'center',
			}, 			
			items:[
			{
				
	            xtype: 'fieldset',
	            title: 'Video 플레이어',
	            instructions: 'Video를 제어합니다.',			           
	            width: 400,
	            height:400,
 	            
	            items:[
	            { 	xtype: 'spacer',
	            	height: 20
	            },
				{
	                xtype: 'video',
	                url: 'space.mp4',
	                id:'player',
	                loop: true,
	                width: 400,
	                height: 300,
	                //posterUrl: 'Screenshot.png'
            	},
	            { 	xtype: 'spacer',
	            	height: 10
	            },                	        
				{
			    	layout: {
						type: 'hbox', 
						pack: 'center',					
					},
					 		
					items:[
		            { 	xtype: 'spacer',
		            	width: 50
		            },					
					{			
						xtype:'button',
						width:50,
						text:'▶',
						handler:function(){

							Ext.getCmp("player").play();
							
						}
					},
					{			
						xtype:'button',
						width:50,
						text:'●', 
						handler:function(){

							Ext.getCmp("player").pause();
							
						}
					},
					{			
						xtype:'button',
						width:50,
						text:'♬', 
						handler:function(){
							Ext.getCmp("player").toggle();

						}
					},
		            { 	xtype: 'spacer',
		            	width: 50
		            }															
					]
				},
	            { 	xtype: 'spacer',
	            	height: 20
	            }],
			}],
	          
	    });	
    }
});


