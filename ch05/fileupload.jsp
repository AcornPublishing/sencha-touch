<%@ page contentType="text/html;charset=euc-kr"%>
<%@ page import="org.apache.commons.fileupload.DiskFileUpload"%>
<%@ page import="org.apache.commons.fileupload.FileItem"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="java.io.File"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=euc-kr">
<title>Process File Upload</title>
</head>
<%
System.out.println("Content Type ="+request.getContentType());

DiskFileUpload fu = new DiskFileUpload();
//fu.setSizeMax(1000000);

List fileItems = fu.parseRequest(request);
Iterator itr = fileItems.iterator();

while(itr.hasNext()) {
  	FileItem fi = (FileItem)itr.next();

  	if(!fi.isFormField()) {
    	System.out.println("nNAME: "+fi.getName());
    	System.out.println("SIZE: "+fi.getSize());

    	File fNew= new File(application.getRealPath("/book/part5/"), fi.getName());
    	System.out.println(fNew.getAbsolutePath());
    	fi.write(fNew);
  	}
  	else {
    	System.out.println("Field ="+fi.getFieldName());
  	}
}
%>
<body>
Upload Successful!!
</body>
</html>