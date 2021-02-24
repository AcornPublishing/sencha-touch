<%@ page contentType="text/html;charset=euc-kr"  pageEncoding="euc-kr" %>
<%

    request.setCharacterEncoding("EUC-KR");
    int firstNum  = Integer.parseInt(request.getParameter("firstNum"));
    int secondNum = Integer.parseInt(request.getParameter("secondNum")); 
    
    out.println(String.valueOf(firstNum + secondNum));
%>