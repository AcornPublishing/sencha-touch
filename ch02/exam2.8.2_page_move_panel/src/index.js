
Ext.setup({
    icon: 'icon.png',
    glossOnIcon: false,
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    onReady: function() {
        initFirstPanel();
        initSecondPanel();
        showFirstPanel();
    }
});

var firstPanel;
var secondPanel;

function showFirstPanel()
{
    firstPanel.show();
    secondPanel.hide();
}

function showSecondPanel()
{
    secondPanel.show();
    firstPanel.hide();
}