var mainPanel;
var firstPanel;
var secondPanel;

Ext.setup({
    icon: 'icon.png',
    glossOnIcon: false,
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    onReady: function() {
        initMainPanel();
        initFirstPanel();
        initSecondPanel();
        showMainPanel();
    }
});

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

function showMainPanel()
{
    mainPanel.items.add(firstPanel);
    mainPanel.items.add(secondPanel);
    showFirstPanel();
}
function initMainPanel()
{
    mainPanel = new Ext.Panel({
        fullscreen: true,        

        dockedItems :[{
            dock: 'top',
            xtype: 'toolbar',
            items: [
            {
                text: '첫번째',
                handler: function(btn,event){
                    showFirstPanel();
                }
            },
            {
                text: '두번째',
                handler: function(btn,event){
                    showSecondPanel();
                }
            }]
        }], 
    }); 
}

