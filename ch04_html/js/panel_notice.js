Ext.ns("notice");
Ext.ns("notice.panel_notice");

notice.init = function(){
    try
    {
        notice.panel_notice.destroy();      
    }
    catch(e)
    {
        console.log(e);
    }    
           
    notice.panel_notice = new Ext.Panel({
        useCurrentLocation: true,               
        html:'공지사항',
        
        getnoticeList:function()
        {
            Ext.Ajax.request({
                url: './jsp/notice_list.jsp',
                success: function(response, opts) {
                    console.log(response.responseText);
                    var JsonData = JSON.parse(response.responseText);
                    console.log(JsonData);
                    if(JsonData.data.err == "")
                    {
                        notice.panel_notice.setNoticeList(JsonData.data.notice_list);
                    }
                    else
                    {
                        alert(JsonData.data.err);
                    }
                }
            });         
        },
        setNoticeList:function(Jv_data) {
            var tempListHtml = "<BR><BR><CENTER><B>공지사항</B><BR><BR>" + 
                "<table bgcolor='white' border=1 width='80%'>";
            for(i=0; i< Jv_data.length;i++)
            {
                tempListHtml = tempListHtml + 
                    "<tr><td>" + 
                    "<a href='javascript:notice.panel_notice.showNoticeDetail(\"" + 
                    Jv_data[i].subject + "\",\"" + Jv_data[i].content + "\",\"" + 
                    Jv_data[i].writer + "\")'>" + 
                    Jv_data[i].subject + "</a></td><td><div align='center'>" + 
                    Jv_data[i].writer + "</div></td></tr>";
            }
            tempListHtml = tempListHtml + "</table>";
            notice.panel_notice.update(tempListHtml);
        },
        showNoticeDetail: function(subject, content, writer) {
                overlay_notice.setCentered(true);
                noticeOverlayToolbar.setTitle('공지사항정보');
                overlay_notice.show();   
                overlay_notice.update("제목:" + subject + 
                    "<BR><hr>내용:" + content + "<BR><hr>작성자:" +writer);
        }          

    });

    var noticeOverlayToolbar = new Ext.Toolbar({
       dock: 'top'
    });
    
    var overlay_notice = new Ext.Panel({
    
        floating: true,
        modal: true,
        centered: true,
        width: 310,
        height: 300,
        dockedItems: noticeOverlayToolbar,
        html:'상세정보'
    });    
}