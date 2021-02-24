Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady: function() {
        new Ext.Panel({
            fullscreen: true,
            
            layout: {
                type: 'vbox',
               	align: 'stretch',
		       	pack: 'center',
            },
            defaults: {
                flex: 1
            },
            
            items: [{
            	id:'carousel',		
            	xtype:'carousel',	
	            defaults: {
	                cls: 'card'
	            },
	            direction:'vertical',
	            items: [{
	            	title: 'Tab 1',
	                html: '<center><BR><img src="./img/j.jpg" width="70%"><BR>직급 : 왕자<BR>이름 : J<BR>담당업무:서무</center>'
	            },
	            {
	                title: 'Tab 2',
	                html: '<center><BR><img src="./img/q.jpg" width="70%"><BR>직급 : 왕비<BR>이름 : Q<BR>담당업무:인테리어</center>'
	            },
	            {
	                title: 'Tab 3',
	                html: '<center><BR><img src="./img/k.jpg" width="70%"><BR>직급 : 왕<BR>이름 : K<BR>담당업무:사내식당관리</center>'
	            }]            	
            }]
        });
    }
});