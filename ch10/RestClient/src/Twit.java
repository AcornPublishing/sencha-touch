import java.io.*;
import java.net.*;

import javax.ws.rs.core.*;

import com.sun.jersey.api.client.*;
import com.sun.jersey.api.client.config.*;
import com.sun.jersey.api.client.filter.*;
import com.sun.jersey.api.representation.*;
import com.sun.jersey.multipart.*;
import com.sun.jersey.multipart.file.*;

public class Twit
{
	/**
	 * @param args
	 */
	public static void main(String[] args){
		/* 기본 URI 요청 설정 */
		ClientConfig config = new DefaultClientConfig();
		Client client = Client.create(config);
		//client.addFilter(new LoggingFilter());
		WebResource service = client.resource(getBaseURI());
		Twit tw = new Twit();
		//tw.twitWrite(service);
		tw.twitWriteNoimg(service);
		tw.twitRead(service);
		//tw.twitReadRecent(service);
		
	}

	/*
	 * 전체글갖고오기-GET
	 * http://localhost:8080/RestService/jersey/twit/{user_id}
	 */
	public void twitRead(WebResource service){
		String loginResult = service.path("twit")
			.path("csm0222")
			.accept(MediaType.APPLICATION_JSON)
			.get(String.class);
		System.out.println(loginResult);
	}

	/*
	 * 최신글갖고오기-GET
	 * http://localhost:8080/RestService/jersey/twit/{user_id}/{num}
	 */
	public void twitReadRecent(WebResource service){
		String loginResult = service.path("twit")
			.path("csm0222")
			.path("4")
			.accept(MediaType.APPLICATION_JSON).get(String.class);
		System.out.println(loginResult);
	}
	
	/*
	 * 글작성하기-POST
	 * http://localhost:8080/RestService/jersey/twit/create
	 * {talking_img}/{user_id}/{content}/{reg_kind}
	 */
	public void twitWrite(WebResource service){

		File file = null; 
		file = new File("c:\\localimg\\사본 - jeju.jpg"); 

		FormDataMultiPart fdmp = new FormDataMultiPart(); 
		fdmp.bodyPart(new FileDataBodyPart("talking_img", file, MediaType.MULTIPART_FORM_DATA_TYPE)); 
		fdmp.bodyPart(new FormDataBodyPart("user_id", "csm0222")); 
		fdmp.bodyPart(new FormDataBodyPart("content", "제주도 같이 갈사람~")); 
		fdmp.bodyPart(new FormDataBodyPart("reg_kind", "2")); 
		
		ClientResponse createResult = service.path("twit").path("create")
				.type(MediaType.MULTIPART_FORM_DATA_TYPE)
				.post(ClientResponse.class, fdmp);
         String string = createResult.getEntity(String.class); 

         System.out.println(string); 
	}


	/*
	 * 글작성하기-POST
	 * http://localhost:8080/RestService/jersey/twit/create
	 * {talking_img}/{user_id}/{content}/{reg_kind}
	 */
	public void twitWriteNoimg(WebResource service){

		Form fdmp = new Form();
		fdmp.add("user_id", "csm0222"); 
		fdmp.add("content", "제주도 같이 갈사람~"); 
		fdmp.add("reg_kind", "1"); 
		
		ClientResponse createResult = service.path("twit").path("createnoimg")
				.type(MediaType.APPLICATION_FORM_URLENCODED_TYPE)
				.post(ClientResponse.class, fdmp);
         String string = createResult.getEntity(String.class); 

         System.out.println(string); 
	}
	// 기본URI
	private static URI getBaseURI(){
		//return UriBuilder.fromUri("http://pscapps.com/RestService").build();
		return UriBuilder.fromUri("http://localhost:8080/RestService/jersey").build();
	}
	
}
