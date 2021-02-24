package com.rest.Service;

import java.io.*;
import java.util.*;

import javax.annotation.*;
import javax.servlet.http.*;
import javax.ws.rs.*;
import javax.ws.rs.core.*;

import org.codehaus.jettison.json.*;
import org.springframework.stereotype.*;

import com.rest.Dao.*;
import com.rest.Util.*;
import com.sun.jersey.core.header.*;
import com.sun.jersey.multipart.*;

/**  
 * @Class Name : TwitService.java
 * @Description : 사내게시판서비스
 * 
 */
@Service("TwitService")
@Path("/twit")
public class TwitService
{
	private TwitDao twitDao;

    @Resource(name="TwitDao")
    public void setTwitDao(TwitDao twitDao) {
		this.twitDao = twitDao;
    }
    
    /**
	 * 전체글갖고오기.
	 */
	@GET
    @Path("{user_id}")
	@Produces("application/json")
	@Consumes(MediaType.TEXT_PLAIN)
	public String twitRead(@PathParam("user_id") String user_id) throws Exception{
		JSONObject jsonData = new JSONObject();
		JSONObject jsonTable = new JSONObject();
		JSONArray jsonArray = new JSONArray();
		try{
			List<Map<String, Object>> lst = new ArrayList<Map<String, Object>>();
			lst = twitDao.twitRead();
			if(lst.isEmpty()){
				jsonTable.put("snss","");
				jsonTable.put("err", "데이터가 없습니다.");
				jsonData.put("data",jsonTable);
				return jsonData.toString();
			}
			Iterator itr = lst.iterator();
			int i = 0;
			while(itr.hasNext()){
				itr.next();
				jsonArray.put(lst.get(i++));
			}
			jsonTable.put("snss",jsonArray);
			jsonTable.put("err", "");
		}catch(Exception ex){
			jsonTable.put("snss","");
			jsonTable.put("err", "시스템오류.");
		}
		jsonData.put("data",jsonTable);
		return jsonData.toString();
	}

    /**
	 * 최신글갖고오기.
	 */
	@GET
    @Path("{user_id}/{idx}")
	@Produces("application/json")
	@Consumes(MediaType.TEXT_PLAIN)
	public String twitReadRecent(@PathParam("user_id") String user_id,@PathParam("idx") int idx) throws Exception{
		JSONObject jsonData = new JSONObject();
		JSONObject jsonTable = new JSONObject();
		JSONArray jsonArray = new JSONArray();
		try{
			List<Map<String, Object>> lst = new ArrayList<Map<String, Object>>();
			lst = twitDao.twitReadRecent(idx);
			if(lst.isEmpty()){
				jsonTable.put("snss","");
				jsonTable.put("err", "데이터가 없습니다.");
				jsonData.put("data",jsonTable);
				return jsonData.toString();
			}
			Iterator itr = lst.iterator();
			int i = 0;
			while(itr.hasNext()){
				itr.next();
				jsonArray.put(lst.get(i++));
			}
			//jsonArray.put("snss", lst);
			jsonTable.put("snss",jsonArray);
			jsonTable.put("err", "");
		}catch(Exception ex){
			jsonTable.put("snss","");
			jsonTable.put("err", "시스템오류.");
		}
		jsonData.put("data",jsonTable);
		return jsonData.toString();
	}
	
    /**
	 * 글작성하기.
	 */
	@POST
    @Path("createnoimg")
	@Produces(MediaType.TEXT_PLAIN)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String createIDNoimg(@FormParam("user_id") String user_id
			,@FormParam("content") String content
			,@FormParam("reg_kind") String reg_kind
			,@FormParam("inpUrl") String inpUrl
			,@Context HttpServletResponse servletResponse)throws Exception{
		JSONObject jsonData = new JSONObject();
		Map<String, Object> tableMp = new HashMap<String, Object> ();
		try{
			twitDao.twitWrite(user_id, content, reg_kind, "");
			tableMp.put("err", "");
			jsonData.put("success","true");

		}catch(Exception ex){
			System.out.println(ex);
			tableMp.put("err", "시스템 오류입니다.");
			jsonData.put("success","false");
		}
		jsonData.put("data",tableMp);
        return jsonData.toString(); 
	}

    /**
	 * 글작성하기.
	 */
	@POST
    @Path("create")	
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public void createID(@FormDataParam("talking_img") InputStream  fileStream
			,@FormDataParam("talking_img") FormDataContentDisposition disposition
			,@FormDataParam("user_id") String user_id
			,@FormDataParam("content") String content
			,@FormDataParam("reg_kind") String reg_kind
			,@FormDataParam("inpUrl") String inpUrl
			,@Context HttpServletResponse servletResponse)throws Exception{
		JSONObject jsonData = new JSONObject();
		Map<String, Object> tableMp = new HashMap<String, Object> ();
		try{
			// 파일처리
			ClassLoader loader = Thread.currentThread().getContextClassLoader();
			System.out.println(loader.getResource(Util.Path_user).getPath() + disposition.getFileName());
    		Util.writeToFile(fileStream, loader.getResource(Util.Path_user).getPath() + disposition.getFileName());
    		fileStream.close();
			twitDao.twitWrite(user_id, content, reg_kind, disposition.getFileName());
			tableMp.put("err", "");

		}catch(Exception ex){
			System.out.println(ex);
			tableMp.put("err", "시스템 오류입니다.");
		}
		jsonData.put("data",tableMp);
		servletResponse.sendRedirect(inpUrl); 
	}
}
