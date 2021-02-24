Ext.ns("menu");
Ext.ns("menu.panel_menu");

var menu_html = "<center><BR><table width='80%' border='1'>" + 
			"<tr><td><center><a href=\"javascript:menu1();\"><img src='./img/info.png' width='80%' border='1'></a></td>" + 
				"<td><center><a href=\"javascript:menu2();\"><img src='./img/user_list.png' width='80%' border='1'></a></td>" + 
				"<td><center><a href=\"javascript:menu3();\"><img src='./img/calendar.png' width='80%' border='1'></a></td></tr>" + 
			"<tr><td><center><a href=\"javascript:menu4();\"><img src='./img/photo1.png' width='80%' border='1'></a></td>" + 
				"<td><center><a href=\"javascript:menu5();\"><img src='./img/tv.png' width='80%' border='1'></a></td>" + 
				"<td><center><a href=\"javascript:menu6();\"><img src='./img/globe1.png' width='80%' border='1'></a></td></tr></table>";

function menu1()
{
	alert('hi1');
	console.log(Ext.getCmp("detail.panel_detail"));
	Ext.getCmp("MainPanel").layout.setActiveItem(Ext.getCmp("detail.panel_detail"));
	
}
function menu2()
{
}
function menu3()
{
}
function menu4()
{
}
function menu5()
{
}
function menu6()
{
}				

menu.panel_menu = new Ext.form.FormPanel({
    useCurrentLocation: true,               
    scroll:'vertical',
    //cardSwitchAnimation:"slide",
 	html : menu_html,
    
}); 

