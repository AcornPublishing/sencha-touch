package com.rest.Service;

import java.io.*;
import java.util.*;

import javax.annotation.*;
import javax.servlet.http.*;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import javax.xml.bind.*;

import org.codehaus.jettison.json.*;
import org.springframework.stereotype.*;

import com.rest.Dao.*;
import com.rest.Util.*;
import com.rest.Vo.*;
import com.sun.jersey.core.header.*;
import com.sun.jersey.multipart.*;

/**  
 * @Class Name : LoginService.java
 * @Description : 로그인서비스
 * 
 */
@Service("LoginService")
@Path("/login")
public class LoginService
{
	private LoginDao loginDao;
    
    @Resource(name="LoginDao")
    public void setLoginDao(LoginDao loginDao) {
		this.loginDao = loginDao;
    }
    
    /**
	 * 로그인.
	 */
	@GET
    @Path("{user_id}/{user_pwd}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.TEXT_PLAIN)
	public String selectLogin(@PathParam("user_id") String user_id,@PathParam("user_pwd") String user_pwd) throws Exception{
		Map<String, Object> tableMp = new HashMap<String, Object> ();
		JSONObject jsonData = new JSONObject();
		try{
			tableMp = loginDao.selectLogin(user_id);
			System.out.println(tableMp.size());
			System.out.println(tableMp.isEmpty());
			tableMp.put("err", "");
			if(tableMp.isEmpty()){
				tableMp.clear();
				tableMp.put("userName", "");
				tableMp.put("err", "등록되지 않은 아이디 입니다.");
			}else if(!tableMp.get("user_pwd").equals(user_pwd)){
				tableMp.clear();
				tableMp.put("userName", "");
				tableMp.put("err", "비밀번호 오류입니다.");
			}
		}catch(Exception ex){
			System.out.println(ex.getMessage());
			tableMp.clear();
			tableMp.put("userName", "");
			tableMp.put("err", "시스템 오류입니다.");
		}
		jsonData.put("data",tableMp);
		System.out.println(jsonData.toString());
	   return jsonData.toString();
	}

    /**
	 * 계정생성.
	 */
	@POST
	@Produces(MediaType.TEXT_PLAIN)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String createID(@FormParam("user_id") String user_id
			,@FormParam("user_pwd") String user_pwd
			,@FormParam("user_name") String user_name
			,@FormParam("user_age") String user_age
			,@FormParam("user_email") String user_email){
		String retStr="";
		try{
			int result = loginDao.createID(user_id, user_pwd, user_name, user_age, user_email);
			if(result == 1)
				retStr = "success.. ";
			else
				retStr = "fail.. ";
		}catch(Exception ex){
			System.out.println(ex.getMessage());
			retStr = "error.. " + ex.getClass().getName();
		}
	   return retStr;
	}

    /**
	 * 계정생성 & 파일업로드.
	 */
	@POST
    @Path("create")
	@Produces(MediaType.TEXT_PLAIN)
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public void createID2(@FormDataParam("user_id") String user_id
			,@FormDataParam("user_pwd") String user_pwd
			,@FormDataParam("user_name") String user_name
			,@FormDataParam("inpUrl") String inpUrl
			,@FormDataParam("user_img") InputStream  fileStream
			,@FormDataParam("user_img") FormDataContentDisposition disposition
			,@Context HttpServletResponse servletResponse) throws Exception{
		JSONObject jsonData = new JSONObject();
		Map<String, Object> tableMp = new HashMap<String, Object> ();
		String result="";
		try{
			// 파일처리
	        if (fileStream != null) { 
	    		// 저장
				ClassLoader loader = Thread.currentThread().getContextClassLoader();
	    		Util.writeToFile(fileStream, loader.getResource(Util.Path_user ).getPath() + disposition.getFileName());
	    		fileStream.close();
				loginDao.createID2(user_id, user_pwd, user_name, disposition.getFileName());
	        }else{
				loginDao.createID2(user_id, user_pwd, user_name, "");
	        }

			tableMp.put("err", "");
			result = "등록하였습니다.";
		}catch(Exception ex){
			System.out.println(ex.getMessage());
			tableMp.put("err", "시스템 오류입니다.");
			result = "등록 오류입니다..";
		}
		jsonData.put("data",tableMp);
        servletResponse.sendRedirect(inpUrl); 
	}

    /**
	 * 계정수정.
	 */
	@PUT
	@Produces(MediaType.TEXT_PLAIN)
	public String updateID(JAXBElement<User> usr){
		String retStr="";
		User user = usr.getValue();
		try{
			int result = loginDao.updateID(user);
			if(result == 1)
				retStr = "success.. ";
			else
				retStr = "fail.. ";
		}catch(Exception ex){
			System.out.println(ex.getMessage());
			retStr = "error.. " + ex.getClass().getName();
		}
	   return retStr;
	}


    /**
	 * 계정수정 & 파일업로드.
	 */
	@POST
    @Path("update")
	@Produces(MediaType.TEXT_PLAIN)
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public String updateID2(@FormDataParam("user_id") String user_id
			,@FormDataParam("user_pwd") String user_pwd
			,@FormDataParam("user_name") String user_name
			,@FormDataParam("user_img") InputStream  fileStream
			,@FormDataParam("user_img") FormDataContentDisposition disposition)throws Exception{
		JSONObject jsonData = new JSONObject();
		Map<String, Object> tableMp = new HashMap<String, Object> ();
		try{
			// 파일처리
	        if (fileStream != null) { 
	    		// 저장
				ClassLoader loader = Thread.currentThread().getContextClassLoader();
	    		Util.writeToFile(fileStream, loader.getResource(Util.Path_user).getPath() + disposition.getFileName());
	    		fileStream.close();
	    		
				loginDao.updateID2(user_id, user_pwd, user_name, disposition.getFileName());
	        }else{
				loginDao.updateID2(user_id, user_pwd, user_name, "");
	        }
			tableMp.put("err", "");
		}catch(Exception ex){
			System.out.println(ex.getMessage());
			tableMp.put("err", "시스템 오류입니다.");
		}
		jsonData.put("data",tableMp);
        return jsonData.toString(); 
	}

    /**
	 * 계정삭제.
	 */
	@GET
    @Path("/delete/{user_id}/{user_pwd}")
	@Produces(MediaType.TEXT_HTML)
	public String deleteID(@PathParam("user_id") String user_id,@PathParam("user_pwd") String user_pwd) throws Exception{
		JSONObject jsonData = new JSONObject();
		Map<String, Object> tableMp = new HashMap<String, Object> ();
		try{
			loginDao.deleteID(user_id,user_pwd);
			tableMp.put("err", "");
		}catch(Exception ex){
			System.out.println(ex.getMessage());
			tableMp.put("err", "시스템 오류입니다.");
		}
		jsonData.put("data",tableMp);
	   return jsonData.toString();
	}
}
