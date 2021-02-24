<%@ page contentType="text/html;charset=euc-kr" %>
<%@ page import="org.apache.commons.fileupload.DiskFileUpload"%>
<%@ page import="org.apache.commons.fileupload.FileItem"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="java.io.File"%>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.Statement" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Calendar" %>
<%@ page import="java.util.Date" %>

<%
response.setHeader("Access-Control-Allow-Origin", "*");
response.setHeader("Access-Control-Allow-Headers", "X-Requested-With");

String returnStr="";
String err="'err':''";


String fileName= "";
String userId= "";
String userPwd="";
String userName="";

System.out.println("Content Type ="+request.getContentType());
DiskFileUpload fu = new DiskFileUpload();
fu.setSizeMax(50000000);
List fileItems;
{
    fileItems = fu.parseRequest(request);
    Iterator itr = fileItems.iterator();        
    while(itr.hasNext()) 
    {
        FileItem fi = (FileItem)itr.next();
        if(fi.isFormField()) 
        {
            if(fi.getFieldName().equals("user_id"))
                userId = fi.getString();
            if(fi.getFieldName().equals("user_pwd"))
                userPwd = fi.getString();
            if(fi.getFieldName().equals("user_name"))
                userName = fi.getString();                
        }
    }
}

SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmsss");
Date date1 = new Date();
fileName = userId + sdf.format(date1);

{
    //List fileItems = fu.parseRequest(request);
    Iterator itr = fileItems.iterator();
    System.out.println("1");
    while(itr.hasNext()) 
    {
    System.out.println("2");
        FileItem fi = (FileItem)itr.next();
        
        if(!fi.isFormField()) 
        {
        System.out.println("3");
            fileName = fi.getName();
            System.out.println("nNAME: "+fi.getName());
            //System.out.println("SIZE: "+fi.getSize());

            File fNew = new File(application.getRealPath("/") + "/book/part10/talking_img",fileName);
            fi.write(fNew);         
        }
    }
}


Connection conn = null;
Statement stmt = null;
ResultSet rs = null;
try
{
	Class.forName("com.mysql.jdbc.Driver");

	
	conn = DriverManager.getConnection(
		"jdbc:mysql://127.0.0.1:3306/talking?useUnicode=true&characterEncoding=euckr", 
		"root", 
		"1234");
	stmt = conn.createStatement();
	int cnt = stmt.executeUpdate(
		"insert into users( user_id, user_pwd, user_name, user_img, reg_date) values( " + 
	   "'" + userId + "','" + userPwd + "','" + userName + "','" +  fileName + "',Now())");
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
