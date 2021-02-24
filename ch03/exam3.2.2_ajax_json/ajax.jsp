<%@ page contentType="text/html;charset=euc-kr"  pageEncoding="euc-kr" %>
<%

    request.setCharacterEncoding("EUC-KR");
    int firstNum  = Integer.parseInt(request.getParameter("firstNum"));
    int secondNum = Integer.parseInt(request.getParameter("secondNum")); 
    
    StringBuffer rtnVal = new StringBuffer();
    
    rtnVal.append("{\"data\":")
          .append("\"")
          .append(String.valueOf(firstNum + secondNum))
          .append("\"")
          .append("}");
    out.println(rtnVal);
%>