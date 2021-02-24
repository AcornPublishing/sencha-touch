/*************************************************
*
* file: common.js
* 
* 설명: 공통 Panel을 정의한다.
*
**************************************************/

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


// 첫번째 판넬
var FirstPanel;

// 두번째 판넬
var SecondPanel;

// 첫번째 판넬 보여주기
function showFirstPanel()
{
	FirstPanel.show();
	SecondPanel.hide();
}

// 두번째 판넬 보여주기
function showSecondPanel()
{
	SecondPanel.show();
	FirstPanel.hide();
}

