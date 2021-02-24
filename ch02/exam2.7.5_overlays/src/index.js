Ext.setup({
    icon: 'icon.png',
    glossOnIcon: false,
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    onReady: function() {
        
        var overlayToolbar = new Ext.Toolbar({
           dock: 'top'
        });
        
        var overlay = new Ext.Panel({
            floating: true,
            modal: true,
            centered: false,
            width: 400,
            height: 400,
            styleHtmlContent: true,
            dockedItems: overlayToolbar,
            scroll: 'vertical',
            contentEl: 'overlayid',
            cls: 'htmlcontent'
        });


        var dockedItems = [{
            dock: 'top',
            xtype: 'toolbar',
            items: [{
                text: '버튼 Overlay 보여주기',
                handler: function(btn,event){
		            overlay.setCentered(false);
		            overlayToolbar.setTitle('버튼에 위치한Overlay');
		            overlay.showBy(btn);                	
                }
            }, 
            {xtype: 'spacer'}, 
            {
                text: '가운데 Overlay 보여주기',
                handler: function(btn,event){
		            overlay.setCentered(true);
		            overlayToolbar.setTitle('가운데 위치한Overlay');
		            overlay.show();                	
                }
            }, 
            ]
        }];
        
        new Ext.Panel({
            fullscreen: true,
            dockedItems: dockedItems,
            html: "Overlay를 보여주는 예제입니다."
        });
    }
});