Ext.ns("login");

var loginHtml = 
    "<BR><BR><BR><CENTER><BR>" + 
    "<table width='80%'>"+ 
    "<tr><td>아이디</td>"+ 
    "<td><input type='text' id='login.user_id' size='8'></td></tr>" + 
    "<tr><td>암호</td>" +
    "<td><input type='password' id='login.user_pwd' size='8'></td></tr>" + 
    "<table>"+ 
    "<center>" + 
    "<BR>" + 
    "<input type='button' value='로그인' " + 
       "onclick='javascript:login.panel_login.setLogin();'>";

login.panel_login = new Ext.form.FormPanel({
    useCurrentLocation: true,               
    scroll:'vertical',
    cardSwitchAnimation:"slide",
    id:'login.panel_login',
    html: loginHtml,
    setLogin:function(){                 
        
        console.log(login.panel_login);
        Ext.Ajax.request({
            url: './jsp/login.jsp?user_id=' + 
                document.getElementById("login.user_id").value + 
                 '&user_pwd=' + document.getElementById("login.user_pwd").value,
            success: function(response, opts) {
                var JsonData = JSON.parse(response.responseText);
                console.log(JsonData);
                if(JsonData.data.err == "")
                {
                    if(JsonData.data.longYn == "N")
                    {
                        alert(JsonData.data.err);
                    }
                    else
                    {
                        alert('로그인 성공!!');
                        mail.init();
                        mail.panel_mail.getMailList();
                        main.MainPanel.layout.setActiveItem(mail.panel_mail);
                    }
                }
                else
                {
                    alert(JsonData.data.err);
                }
                
            }
        });                     
    }    
}); 