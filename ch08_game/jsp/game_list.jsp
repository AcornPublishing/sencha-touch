<%@ page contentType="text/html;charset=euc-kr"  pageEncoding="euc-kr" %>
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
String topList = "'top_list':''";
Connection conn = null;
Statement stmt = null;
ResultSet rs = null;
try
{
    request.setCharacterEncoding("euc-kr");
    Class.forName("com.mysql.jdbc.Driver");
    conn = DriverManager.getConnection(
        "jdbc:mysql://127.0.0.1:3306/game?" + 
        "useUnicode=true&characterEncoding=euckr", 
        "root", 
        "1234");
    stmt = conn.createStatement();
    String sql = "select num, name, seconds from toplist order by seconds";
    rs= stmt.executeQuery(sql);    
    StringBuffer tempList = new StringBuffer();
    int i=0;
    int count = 0;
    while(rs.next())
    {
        // 상위 10명
        if(count >= 10)
        {
            break;
        }
        count++;
        if(i != 0)
        {
            tempList.append(",");
        }
        tempList.append("{'num':'").append(rs.getInt("num"))
                .append("','name':'").append(rs.getString("name"))
                .append("','seconds':'").append(rs.getInt("seconds")).append("'}");
        i++;
    }
    
    if(i==0)
    {       
        tempList.append("{'num':'")
                .append("','name':'")
                .append("','seconds':''}");
    }
    topList = "'top_list':[" + tempList.toString() + "]";
}
catch(Exception ex)
{
    err = "'err': '오류.. 적절히 처리'" + ex.toString();
}
finally
{
    try{ rs.close();}catch(Exception exRs){}
    try{ stmt.close();}catch(Exception exStmt){}
    try{ conn.close();}catch(Exception exConn){}
}
returnStr = "{'data':{" + topList + "," + err + "}}";

out.println(returnStr.replace('\'','\"').trim());
%>

