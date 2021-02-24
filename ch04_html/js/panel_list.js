Ext.ns("list");


var psnHtml = "<center><BR><BR><B>직원조회</B><BR><BR><table width='80%'><tr><td>직원명 : <input type='text' size='10' id='list.user_name'></td>" + 
			  "<td> <input type='button' value='조회' onclick='javascript:list.panel_list.getPsnList()'></td></tr></table><BR><BR>";

list.init = function(){               
    list.panel_list = new Ext.Panel({
        useCurrentLocation: true,               
        scroll:'vertical',
        scroll: 'vertical',
        html: psnHtml,
        getPsnList:function(){                 
            Ext.Ajax.request({
                url: './jsp/psn_list.jsp?user_name=' + document.getElementById("list.user_name").value,
                success: function(response, opts) {
                    console.log(response.responseText);
                    var JsonData = JSON.parse(response.responseText);
                    console.log(JsonData);
                    if(JsonData.data.err == "")
                    {
                    	var tempListHtml = "<table bgcolor='white' border=1 width='80%'>";
						for(i=0; i< JsonData.data.psn_list.length;i++)
	                    {
	                    	tempListHtml = tempListHtml + "<tr><td><center><a href='javascript:list.panel_list.showPsnDetail(\"" + JsonData.data.psn_list[i].user_id + "\")'>" + JsonData.data.psn_list[i].user_id + "</a></td><td><div align='left'>" + JsonData.data.psn_list[i].user_name + "</div></td><td><div align='left'>" + JsonData.data.psn_list[i].tel + "</div></td></tr>";
	                    }
	                    tempListHtml = tempListHtml + "</table>";
	                    list.panel_list.update(psnHtml + tempListHtml);
                    }
                    else
                    {
                        alert(JsonData.data.err);
                    }
                }
            });                     
        },
        showPsnDetail:function(user_id)
        {
			detail.init();
			detail.panel_detail.input_user_id = user_id;
			detail.panel_detail.getUserInfo();        	
			main.MainPanel.layout.setActiveItem(detail.panel_detail);	
        }
    });
}   

   