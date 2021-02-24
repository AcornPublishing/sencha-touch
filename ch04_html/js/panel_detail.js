Ext.ns("detail");
Ext.ns("detail.panel_detail");

detail.init=function(){

	try
	{
		detail.panel_detail.destroy();		
	}
	catch(e)
	{
		console.log(e);
	}
			
	detail.panel_detail = new Ext.form.FormPanel({
		id: 'detail.panel_detail',
	    useCurrentLocation: true,               
	    scroll:'vertical',
	    cardSwitchAnimation:"slide",
	    width: '100%',
	    input_user_id:'',
	    html:'직원상세정보',
	    setUserId:function(user_id)
	    {
	        this.input_user_id = user_id;
	    },
	    
	    getUserInfo:function()
	    {
	        Ext.Ajax.request({
	            url: './jsp/psn_detail.jsp?user_id=' + this.input_user_id,
	            success: function(response, opts) {
	                console.log(response.responseText);
	                var JsonData = JSON.parse(response.responseText);
	                console.log(JsonData);
	                if(JsonData.data.err == "")
	                {
	                    detail.panel_detail.setPersonFields(JsonData.data.psn_detail);
	                }
	                else
	                {
	                    alert(JsonData.data.err);
	                }
	                
	            }
	        });         
	    },  
	    
	    setPersonFields:function(psnDetail)
	    {
	        
	        var detailHtml = '<center><table width="90%" border=0>' + 
	                         '<tr><td><center><img src="./img/' + psnDetail.user_id +  '.png" height="100"></td>' + 
	                         '<td><center><a href="tel:' + psnDetail.tel+ '"><img src="./img/tel.jpg" height="80"></a></td></tr></table>' +
	                         '<BR><BR>' +  
	                         '<table width="90%" bgcolor="white" border=1>' + 
	        				 '<tr><td>사번</td><td>' + psnDetail.user_id + '</td></tr>' + 
	        				 '<tr><td>직원명</td><td>' + psnDetail.user_name + '</td></tr>' + 
	        				 '<tr><td>전화번호</td><td>' + psnDetail.tel + '</td></tr>' + 
	        				 '<tr><td>주소</td><td>' + psnDetail.adr + '</td></tr></table><BR><BR>' + 
	        				 '<a href="javascript:detail.panel_detail.goBack();">돌아가기</a>';
	         				 
	        
	        detail.panel_detail.update(detailHtml);
	        
	    },
	    goBack:function(){                                     
	       main.MainPanel.layout.setActiveItem(list.panel_list); 
	    },
	
	}); 
}    
