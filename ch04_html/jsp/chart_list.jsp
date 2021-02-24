<%@ page contentType="text/html;charset=euc-kr"  pageEncoding="euc-kr" %>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.Statement" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.sql.SQLException" %>

<%
String returnStr="";
String err="'err':''";
String chartList = "'chart_list':''";
Connection conn = null;
Statement stmt = null;
ResultSet rs = null;
try
{
    request.setCharacterEncoding("euc-kr");
    
    Class.forName("com.mysql.jdbc.Driver");

    conn = DriverManager.getConnection(
        "jdbc:mysql://127.0.0.1:3306/books?useUnicode=true&characterEncoding=euckr", 
        "root", 
        "1234");
    stmt = conn.createStatement();
    String sql = "select year,income from chart order by year";

    rs= stmt.executeQuery(sql);
    
    StringBuffer tempList = new StringBuffer();
    int i=0;
    while(rs.next())
    {
        if(i != 0)
        {
            tempList.append(",");
        }
        tempList.append("{'year':'").append(rs.getInt("year"))
                .append("','income':'").append(rs.getString("income"))
                .append("'}");
        i++;
    }
    
    if(i==0)
    {       
        tempList.append("{'year':'")
                .append("','income':''}");
    }
    chartList = "'chart_list':[" + tempList.toString() + "]";
}
catch(Exception ex)
{
    err = "'err': '¿À·ù" + ex.toString() + "'";
}
finally
{
    try{ rs.close();}catch(Exception exRs){}
    try{ stmt.close();}catch(Exception exStmt){}
    try{ conn.close();}catch(Exception exConn){}
}
returnStr = "{'data':{" + chartList + "," + err + "}}";

out.println(returnStr.replace('\'','\"').trim());
%>

