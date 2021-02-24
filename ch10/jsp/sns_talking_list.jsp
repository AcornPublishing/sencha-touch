<%@ page contentType="text/html;charset=euc-kr"  pageEncoding="euc-kr" %>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.Statement" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.sql.SQLException" %>
<%

response.setHeader("Access-Control-Allow-Origin", "*");
response.setHeader("Access-Control-Allow-Headers", "X-Requested-With");

long num;
String returnStr="";
String err="'err':''";
String snsList = "'snss':''";
Connection conn = null;
Statement stmt = null;
ResultSet rs = null;
try
{
    request.setCharacterEncoding("euc-kr");
   
   	try
   	{
    	num = Long.parseLong(request.getParameter("num"));
    }
    catch(Exception exNum)
    {
    	num = 0;
    }
    
    Class.forName("com.mysql.jdbc.Driver");

    conn = DriverManager.getConnection(
        "jdbc:mysql://127.0.0.1:3306/talking?useUnicode=true&characterEncoding=euckr", 
        "root", 
        "1234");
    stmt = conn.createStatement();
    String sql = " select b.user_img, a.reg_kind, a.talking_img, a.num, a.content, b.user_name , a.reg_date " + 
    		     " from talking a, users b " + 
    		     " where a.user_id = b.user_id and a.num > " + num + 
    		     " order by num desc";
	
    rs= stmt.executeQuery(sql);
    
    StringBuffer tempList = new StringBuffer();
    int i=0;
    while(rs.next())
    {
    	if(i >= 30)
    		break;
        if(i != 0)
        {
            tempList.append(",");
        }
        tempList.append("{'num':'").append(rs.getInt("num"))
                .append("','content':'").append(rs.getString("content"))
                .append("','user_name':'").append(rs.getString("user_name"))
                .append("','user_img':'").append(rs.getString("user_img"))
                .append("','talking_img':'").append(rs.getString("talking_img"))
                .append("','reg_kind':'").append(rs.getString("reg_kind"))
                .append("','reg_date':'").append(rs.getString("reg_date")).append("'}");
        i++;
    }
    
    if(i==0)
    {       
        tempList.append("{'num':'")
                .append("','content':'")
                .append("','user_name':'")
                .append("','user_img':'")
                .append("','talking_img':'")
				.append("','reg_kind':'")
                .append("','reg_date':''}");
        err= "'err':'NONE'";
    }
    snsList = "'snss':[" + tempList.toString() + "]";
}
catch(Exception ex)
{
	
    err = "'err':'" + ex.toString() + "'";
}
finally
{
    try{ rs.close();}catch(Exception exRs){}
    try{ stmt.close();}catch(Exception exStmt){}
    try{ conn.close();}catch(Exception exConn){}
}
returnStr = "{'data':{" + snsList + "," + err + "}}";

out.println(returnStr.replace('\'','\"').trim());
%>

