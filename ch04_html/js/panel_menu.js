Ext.ns("menu");


var menu_html = "<center><BR><table width='80%' border='1'>" + 
            "<tr><td width='33%'><center><a href=\"javascript:menu_login();\">" + 
                  "<img src='./img/check_black2.png' width='80%' border='1'></a></td>" + 
                "<td width='33%'><center><a href=\"javascript:menu_psnlist();\">" + 
                  "<img src='./img/user_list.png' width='80%' border='1'></a></td>" + 
                "<td width='33%'><center><a href=\"javascript:menu_mail();\">" + 
                  "<img src='./img/mail1.png' width='80%' border='1'></a></td></tr>" + 
            "<tr><td><center><a href=\"javascript:menu_notice();\">" + 
                  "<img src='./img/info.png' width='80%' border='1'></a></td>" + 
                "<td><center><a href=\"javascript:menu_compose();\">" + 
                  "<img src='./img/compose.png' width='80%' border='1'></a></td>" + 
                "<td><center><a href=\"javascript:menu_chart();\">" + 
                  "<img src='./img/piechart.png' width='80%' border='1'></a></td></tr></table>";
function menu_login()
{
    main.MainPanel.layout.setActiveItem(login.panel_login,'flip');  
}
function menu_psnlist()
{
    list.init();
    main.MainPanel.layout.setActiveItem(list.panel_list,'flip');    
}
function menu_mail()
{
    mail.init();
    main.MainPanel.layout.setActiveItem(mail.panel_mail,'flip'); 
    mail.panel_mail.getMailList();       
}
function menu_notice()
{
    notice.init();
    notice.panel_notice.getnoticeList();
    main.MainPanel.layout.setActiveItem(notice.panel_notice,'flip');    
}
function menu_compose()
{
    gesipan.init();
    gesipan.panel_gesipan.getgesipanList();
    main.MainPanel.layout.setActiveItem(gesipan.panel_gesipan,'flip');  
}
function menu_chart()
{
    chart.init();
    chart.panel_chart.getChartList();
    main.MainPanel.layout.setActiveItem(chart.panel_chart,'flip');      
}               

menu.panel_menu = new Ext.form.FormPanel({
    useCurrentLocation: true,               
    scroll:'vertical',
    cardSwitchAnimation:"flip",
    id:'menu.panel_menu',

    items:[{
        id:'menu.menuFieldset',
        xtype: 'fieldset',
        title: 'MOBILE THIN ...',
        width:'80%',
        align: 'center',
        html : menu_html,
    },
    {
        id:'menu.noticeFieldset',
        xtype: 'fieldset',
        title: '공지사항',
        width:'80%',
        align: 'center',
        html : menu_html,       
    }],
    
    getNoticeList:function()
    {
        Ext.Ajax.request({
            url: './jsp/notice_list.jsp',
            success: function(response, opts) {
                console.log(response.responseText);
                var JsonData = JSON.parse(response.responseText);
                console.log(JsonData);
                if(JsonData.data.err == "")
                {
                    var noticeHtml = "<table width='100%' bgcolor='white'>"
                    for(i=0; i< JsonData.data.notice_list.length;i++)
                    {
                        noticeHtml = noticeHtml + "<tr><td>" + 
                        	JsonData.data.notice_list[i].subject + "</td></tr>";
                    }
                    noticeHtml= noticeHtml + "</table>";
                    Ext.getCmp('menu.noticeFieldset').update(noticeHtml);
                }
                else
                {
                    alert(JsonData.data.err);
                }                
            }
        });         
    }
}); 

