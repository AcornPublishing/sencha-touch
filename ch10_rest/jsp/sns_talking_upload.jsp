<%@ page contentType="text/html;charset=euc-kr"%>
<%@ page import="org.apache.commons.fileupload.DiskFileUpload"%>
<%@ page import="org.apache.commons.fileupload.FileItem"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="java.io.File"%>

<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.Statement" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Calendar" %>
<%@ page import="java.util.Date" %>

<%
response.setHeader("Access-Control-Allow-Origin", "*");
response.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
%>

<%
String returnStr = "";
String fileName= "";
String userId= "";
String content="";
System.out.println("Content Type ="+request.getContentType());
DiskFileUpload fu = new DiskFileUpload();
System.out.println("1");
fu.setSizeMax(50000000);
System.out.println("222");
List fileItems = fu.parseRequest(request);
System.out.println("333");
try
{
	
    
    Iterator itr = fileItems.iterator();    
    System.out.println("1");    
    while(itr.hasNext()) 
    {
    System.out.println("1");
        FileItem fi = (FileItem)itr.next();
        if(fi.isFormField()) 
        {
        System.out.println("1");
            if(fi.getFieldName().equals("user_id"))
                userId = fi.getString();
            if(fi.getFieldName().equals("content"))
                content = fi.getString();
        }
    }
}
catch(Exception ex1)
{
	System.out.println(ex1.toString());
}

System.out.println("11111");

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
    conn = DriverManager.getConnection(
        "jdbc:mysql://127.0.0.1:3306/talking?useUnicode=true&characterEncoding=euckr", 
        "root", 
        "1234");
    stmt = conn.createStatement();
    stmt.executeUpdate("insert into talking (content, user_id, reg_kind, talking_img, reg_date) values( '" + 
                        content + "','" + userId + "','2','"  + fileName + "', Now())");
    
    System.out.println("정상처리됨");

	returnStr = "{'success':'true'}";
	
}
catch(Exception ex)
{
    System.out.println("사진 업로드 오류 : " + ex.toString());
	returnStr = "{'success':'false'}";
}   
finally
{
    try{ rs.close();}catch(Exception exRs){}
    try{ stmt.close();}catch(Exception exStmt){}
    try{ conn.close();}catch(Exception exConn){}
}       
out.println(returnStr.replace('\'','\"').trim());    
%>


