<%@ page contentType="text/html;charset=windows-1252"%>
<%@ page import="org.apache.commons.fileupload.DiskFileUpload"%>
<%@ page import="org.apache.commons.fileupload.FileItem"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="java.io.File"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
<title>Process File Upload</title>
<script language="javascript">
function fileupload()
{
	document.forms[0].action="fileupload.jsp";
	document.forms[0].submit();
}
</script>
</head>
<body>
<form  method="post" enctype="multipart/form-data">
	<input type="text" name="filename" value="aaa.jpg">
	<input type="file" name="file1">
	<a href="javascript:fileupload();"> ¾÷·Îµå</a>
</form>
</body>
</html>