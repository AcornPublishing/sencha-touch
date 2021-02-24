
function initFirstPanel()
{
    firstPanel = new Ext.Panel({
        fullscreen: true,
        layout: {
            type: 'vbox',
            pack: 'center',
        
        }, 
        items: [
        {
            xtype: 'fieldset',
            title: '첫번째 페이지',
            instructions: 'Sencha Touch 영역',                       
            items:[
            {   xtype: 'spacer',
                height: 50
            },                  
            {
                xtype:'button',
                width:200,
                text:'두번째 페이지 호출',
                handler:function(){
                    showSecondPanel();
                }
            },
            {   xtype: 'spacer',
                height: 50
            }],
        }],           
    }); 
}

