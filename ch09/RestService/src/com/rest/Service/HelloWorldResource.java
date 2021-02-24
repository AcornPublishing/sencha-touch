package com.rest.Service;

import java.util.*;

import javax.ws.rs.*;
import javax.ws.rs.core.*;
import javax.xml.transform.dom.*;
import javax.xml.transform.sax.*;
import javax.xml.transform.stream.*;

import org.codehaus.jettison.json.*;
import org.w3c.dom.*;

// "http://localhost:8080/RestService/helloworld/" URL로 서비스.
@Path("/helloworld")
public class HelloWorldResource {
	
	/*
	 * HelloWorld 호출
	 */
	@GET	// HTTP GET 요청 처리
	// "text/plain"으로 Mime 타입 생성한 결과를 리턴함.
	@Produces("text/plain")	
	@Path("/{name}")// Path 변수
	public String getClichedMessage(@PathParam("name") String name) {
		System.out.println("getClichedMessage");
		JSONObject jsonData = new JSONObject();
		Map<String, Object> mp = new HashMap<String, Object> ();
		try{
			mp.put("result", "반갑습니다 " + name + "님");
			jsonData.put("data",mp);
		}catch(Exception e){
			System.out.println(e);
		}
		return jsonData.toString();
	}

    
	@POST
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	// "text/plain"으로 Mime 타입 생성한 결과를 리턴함.
	@Produces("text/plain")	
	public String get1(@FormParam("x") String xname
			,@FormParam("y") String yname) {
		System.out.println("getClichedMessage");
		JSONObject jsonData = new JSONObject();
		Map<String, Object> mp = new HashMap<String, Object> ();
		try{
			mp.put("xname", xname);
			mp.put("yname", yname);
			jsonData.put("data",mp);
		}catch(Exception e){
			System.out.println(e);
		}
		return jsonData.toString();
	}

}
