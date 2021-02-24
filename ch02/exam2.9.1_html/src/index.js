Ext.setup({
    icon: 'icon.png',
    glossOnIcon: false,
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    onReady: function() {

        new Ext.Panel({
            fullscreen:true,
            styleHtmlContent: true,
            contentEl: 'show_div',
            cls: 'htmlcontent'
        });
    }
})