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

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=euc-kr">
<title>Process File Upload</title>
</head>
<%
String fileName= "";
String userId= "";
String content="";
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
            if(fi.getFieldName().equals("user_name"))
                content = fi.getString();
        }
    }
}

SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmsss");
Date date1 = new Date();
fileName = userId + sdf.format(date1);

{    
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


%>
    <script language="javascript">
        alert("등록하였습니다.");
    </script>
<%
}
catch(Exception ex)
{
    out.println("업로드 오류 : " + ex.toString());
%>
    <script language="javascript">
        alert("등록오류");
    </script>
<%  
}   
finally
{
    try{ rs.close();}catch(Exception exRs){}
    try{ stmt.close();}catch(Exception exStmt){}
    try{ conn.close();}catch(Exception exConn){}
}       
        
%>
</html>
