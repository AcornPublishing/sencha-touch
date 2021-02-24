var firstPanel;
var secondPanel;
var mainPanel;

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
function showMainPanel()
{
    mainPanel.items.add(firstPanel);
    mainPanel.items.add(secondPanel);
    mainPanel.doLayout();
    showFirstPanel();
}
function showFirstPanel()
{
    mainPanel.layout.setActiveItem(firstPanel);
}
function showSecondPanel()
{
    mainPanel.layout.setActiveItem(secondPanel);
}
function initMainPanel()
{
    mainPanel = new Ext.Panel({
        fullscreen: true,
        cardSwitchAnimation:"slide",
        layout:'card',          
        dockedItems :[{
            dock: 'top',
            xtype: 'toolbar',

            items: [
            {
                cls:'card1',
                text: '첫번째',
                handler: function(btn,event){
                    mainPanel.layout.setActiveItem(firstPanel);
                }
            },
            {
                cls:'card2',
                text: '두번째',
                handler: function(btn,event){
                    mainPanel.layout.setActiveItem(secondPanel);
                }
            }]
        }], 
    }); 
   
}

