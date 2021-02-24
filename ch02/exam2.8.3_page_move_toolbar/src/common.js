/*************************************************
*
* file: common.js
* 
* 설명: 공통 Panel을 정의한다.
*
**************************************************/


var MainPanel;

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

