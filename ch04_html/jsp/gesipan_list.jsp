<%@ page contentType="text/html;charset=euc-kr"  pageEncoding="euc-kr" %>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.Statement" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.sql.SQLException" %>

<%

StringBuffer returnHtml = new StringBuffer();;
Connection conn = null;
Statement stmt = null;
ResultSet rs = null;

request.setCharacterEncoding("euc-kr");

try
{
    Class.forName("com.mysql.jdbc.Driver");
    
    conn = DriverManager.getConnection(
        "jdbc:mysql://127.0.0.1:3306/books?useUnicode=true&characterEncoding=euckr", 
        "root", 
        "1234");
    stmt = conn.createStatement();
    String sql = "select id,subject, content, writer from gesipan order by id desc";
    
    rs= stmt.executeQuery(sql); 
    %>
    <CENTER>
    <BR><BR><B>게시판</B><BR><BR>
    <TABLE width='90%' border='1' bgcolor='white'>
    <%
    int i=0;    
    while(rs.next())
    {
    %>
        <TR><TD><a href='javascript:gesipan.panel_gesipan.showgesipanDetail( 
            "<%=rs.getString("subject")%>", 
            "<%=rs.getString("content")%>",
            "<%=rs.getString("writer")%>");'>
            <%=rs.getString("subject")%></TD><TD><%=rs.getString("writer")%>
        </TD></TR>
    <%
    }
    %>
    </TABLE>   
<%
}
catch(Exception ex)
{
%>
    오류발생<%=ex.toString()%>
<%
}
finally
{
    try{ rs.close();}catch(Exception exRs){}
    try{ stmt.close();}catch(Exception exStmt){}
    try{ conn.close();}catch(Exception exConn){}
}
%>

