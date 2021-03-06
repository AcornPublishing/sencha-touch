<%@ page contentType="text/html;charset=euc-kr"  pageEncoding="euc-kr" %>

<%@ page import="javax.mail.*" %>
<%@ page import="javax.mail.internet.*" %>
<%@ page import="java.io.*" %>
<%@ page import="java.util.*" %>

<%@ page import="java.util.Hashtable" %>
<%@ page import="java.util.Properties" %>
<%@ page import="javax.naming.Context" %>
<%@ page import="javax.naming.InitialContext" %>
<%@ page import="javax.naming.InitialContext" %>

<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.Statement" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.sql.SQLException" %>

<%
Connection conn = null;
Statement stmt = null;
ResultSet rs = null;

String returnStr="";
String err="'err':''";
String emailList = "'emailList':''";
String userId = "";
String email="";
String emailPwd="";
boolean loginPass = false;

StringBuffer tempList = new StringBuffer();

try
{
    try
    {
        userId =  (String)session.getAttribute("userId");
    }
    catch(Exception ex)
    {
     	throw new Exception("로그인정보가 없습니다.");
   	}   
   	System.out.println(userId + "로그인ID");
    
    Class.forName("com.mysql.jdbc.Driver");
    conn = DriverManager.getConnection(
        "jdbc:mysql://127.0.0.1:3306/books?useUnicode=true&characterEncoding=euckr", 
        "root", 
        "1234");
    stmt = conn.createStatement();
    String sql = "select email, email_pwd from users where user_id = '" + userId + "'";
    rs= stmt.executeQuery(sql);
  
    if(rs.next())
    { 
        email=rs.getString("email");
        emailPwd= rs.getString("email_pwd");   
        loginPass = true; 
        System.out.println("email:" + email);
        System.out.println("emailPwd:" + emailPwd);
        

		// MailList 가져오기
		String hostName = "pop.naver.com";
		Properties props = new Properties();
		Session sessionMail = Session.getDefaultInstance(props, null);
		Store store = null;
		Folder folder = null;

		// Get the store
	    System.out.println("메일읽기");
	    store = sessionMail.getStore("pop3");
	    store.connect(hostName, email, emailPwd);
	    folder = store.getFolder("INBOX");
	    folder.open(Folder.READ_ONLY);
	    Message message[] = folder.getMessages();
	    int messageLength = 0;
	    int max_cnt = 10;
	    messageLength = message.length;
	    
	    int i=0;
	    for (i=0; i< message.length && i< max_cnt; i++) 
	    {
		    if(i !=0 )
		    {
		        tempList.append(",");
		    }
		    tempList.append("{'subject':'").append(message[i].getSubject()).append("'}");
	    }
	    if(i==0)
	    {
	        err = "'err': '메일이 없습니다.'";
	    }
	    folder.close(false);
	    store.close();
	    System.out.println("메일읽기종료");
       
    }
    else    
    {       
        err = "'err': '해당 직원이 존재하지 않습니다.'";
    }
    
    
}
catch(Exception e)
{
	if(err.trim().length()==0)
    	err = "'err': '" + e.toString() + "'";
}
finally
{
    try{ rs.close();}catch(Exception exRs){}
    try{ stmt.close();}catch(Exception exStmt){}
    try{ conn.close();}catch(Exception exConn){}
}
    
emailList = "'email_list':[" + tempList.toString() + "]";
returnStr = "{'data':{" + emailList + "," + err + "}}";

//최종결과를 화면에 출력
out.println(returnStr.replace('\'','\"').trim());
%>

