<%@ page contentType="text/html;charset=euc-kr" %>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.Statement" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.sql.SQLException" %>
<%
response.setHeader("Access-Control-Allow-Origin", "*");
response.setHeader("Access-Control-Allow-Headers", "X-Requested-With");

String returnStr="";
String err="'err':''";
Connection conn = null;
Statement stmt = null;
ResultSet rs = null;
try
{
	// 파라미터 받기
	String userId = request.getParameter("user_id");
	String userPwd = request.getParameter("user_pwd"); 
	String userName = request.getParameter("user_name");
	
	Class.forName("com.mysql.jdbc.Driver");

	
	conn = DriverManager.getConnection(
		"jdbc:mysql://127.0.0.1:3306/talking?useUnicode=true&characterEncoding=euckr", 
		"root", 
		"1234");
	stmt = conn.createStatement();
	int cnt = stmt.executeUpdate(
		"insert into users( user_id, user_pwd, user_name, reg_date) values( " + 
	   "'" + userId + "','" + userPwd + "','" + userName + "',Now())");
	
}
catch(Exception ex)
{
	System.out.println(ex.toString());
	err = "'err': '" + ex.toString() + "'";
}
finally
{
	try{ rs.close();}catch(Exception exRs){}
	try{ stmt.close();}catch(Exception exStmt){}
	try{ conn.close();}catch(Exception exConn){}
}
returnStr = "{'data':{" +  err + "}}";

out.println(returnStr.replace('\'','\"').trim());

%>
