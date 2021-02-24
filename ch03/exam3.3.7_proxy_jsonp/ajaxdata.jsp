<%@ page contentType="text/json;charset=euc-kr"  pageEncoding="euc-kr" %>
<%=request.getParameter("callback111")%>({
    "users": [
        {
            "id": 1,
            "name": "이소희",
            "tel" : "010-1111-1111"
        },
        {
            "id": 2,
            "name": "이수현",
            "tel" : "010-2222-2222"
        },
        {
            "id": 3,
            "name": "이시형",
            "tel" : "010-3333-3333"
        }
    ]
});