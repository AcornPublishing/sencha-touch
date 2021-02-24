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
String rtnOK = "'rtnOK':''";
Connection conn = null;
Statement stmt = null;
ResultSet rs = null;
try
{
    // 파라미터 받기
    String name = request.getParameter("name");
    String seconds = request.getParameter("seconds"); 
    Class.forName("com.mysql.jdbc.Driver");
    conn = DriverManager.getConnection(
        "jdbc:mysql://127.0.0.1:3306/game?" + 
        "useUnicode=true&characterEncoding=euckr", 
        "root", 
        "1234");
    stmt = conn.createStatement();
    stmt.executeUpdate("insert into toplist (name, seconds ) values('"  + 
        name + "',"  + seconds + ")");
    err= "'err':''";
}
catch(Exception ex)
{
    err = "'err': '" + ex.toString() + "'";
}
finally
{
    try{ rs.close();}catch(Exception exRs){}
    try{ stmt.close();}catch(Exception exStmt){}
    try{ conn.close();}catch(Exception exConn){}
}
returnStr = "{'data':{" + err + "}}";
out.println(returnStr.replace('\'','\"').trim());
%>