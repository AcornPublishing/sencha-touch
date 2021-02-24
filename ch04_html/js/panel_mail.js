Ext.ns("mail");





mail.init = function(){

      
                
    mail.panel_mail = new Ext.Panel({
        useCurrentLocation: true,               
        scroll:'vertical',
        cardSwitchAnimation:"slide",

        layout: {
            type: 'vbox',
            pack: 'center',
            align: 'stretch'
        },
        scroll: 'vertical',
        
        getMailList:function()
        {
            Ext.Ajax.request({
                url: './jsp/mail.jsp',
                success: function(response, opts) {
                    console.log(response.responseText);
                    var JsonData = JSON.parse(response.responseText);
                    console.log(JsonData);
                    if(JsonData.data.err == "")
                    {
                    	var tempListHtml = "<CENTER><table bgcolor='white' border=1 width='80%'>";
						for(i=0; i< JsonData.data.email_list.length;i++)
	                    {
	                    	tempListHtml = tempListHtml + "<tr><td><div>" + JsonData.data.email_list[i].subject + "</div></td></tr>";
	                    }
	                    tempListHtml = tempListHtml + "</table>";
	                    mail.panel_mail.update( tempListHtml);
                    }
                    else
                    {
                        alert(JsonData.data.err);
                    }
                    
                }
            });         
        },

    });
}       