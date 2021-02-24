import java.io.*;
import java.net.*;

import javax.ws.rs.core.*;

import com.sun.jersey.api.client.*;
import com.sun.jersey.api.client.config.*;
import com.sun.jersey.api.representation.*;
import com.sun.jersey.multipart.*;
import com.sun.jersey.multipart.file.*;

public class Login
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
		Login lg = new Login();
		//		lg.updateID(service);
//		lg.createID(service);
		
//		lg.deleteID(service);
//		lg.createID2(service);
//		lg.updateID2(service);
		lg.login(service);
		
	}

	/*
	 * 로그인하기
	 * http://localhost:8080/RestService/jersey/login/{user_id}/{user_pwd}
	 */
	public void login(WebResource service){
		String loginResult = service.path("login")
			.path("csm0222")
			.path("seongmi1n")
			.accept(MediaType.APPLICATION_JSON).get(String.class);
		System.out.println("loginResult : " + loginResult);
		
	}
	
	/*
	 * 계정생성하기
	 * http://localhost:8080/RestService/jersey/login/
	 */
	public void createID(WebResource service){
		Form form = new Form();
		form.add("user_id", "csm02222");
		form.add("user_pwd", "seong");
		form.add("user_name", "ChoiSeongMin");
		form.add("user_age", "33");
		form.add("user_email", "csm0222@ibksystem.co.kr");

		ClientResponse createResult = service.path("login").type(MediaType.APPLICATION_FORM_URLENCODED).post(ClientResponse.class, form);
		System.out.println("Form response " + createResult.getEntity(String.class));
	}

	/*
	 * 계정생성하기2(파일첨부)
	 * http://localhost:8080/RestService/jersey/login/create
	 */
	public void createID2(WebResource service){
		File file = null;
//		File file = new File("c:\\localimg\\mypicture.jpg"); 

		FormDataMultiPart fdmp = new FormDataMultiPart(); 
		if (file != null) {
			fdmp.bodyPart(new FileDataBodyPart("user_img", file, MediaType.APPLICATION_OCTET_STREAM_TYPE)); 
			fdmp.bodyPart(new FormDataBodyPart("user_id", "csm0222")); 
			fdmp.bodyPart(new FormDataBodyPart("user_pwd", "seong")); 
			fdmp.bodyPart(new FormDataBodyPart("user_name", "ChoiSeongMin")); 
		}else{
			System.out.println("파일이 없습니다!!");
			fdmp.bodyPart(new FormDataBodyPart("user_id", "csm0222")); 
			fdmp.bodyPart(new FormDataBodyPart("user_pwd", "seong")); 
			fdmp.bodyPart(new FormDataBodyPart("user_name", "ChoiSeongMin")); 
		}
		ClientResponse createResult = service.path("login").path("create")
				.type(MediaType.MULTIPART_FORM_DATA_TYPE)
				.post(ClientResponse.class, fdmp);
         String string = createResult.getEntity(String.class); 

         System.out.println("<script language='javascript'>alert('가입되었습니다');</script>"); 
	}


	/*
	 * 계정수정하기
	 * http://localhost:8080/RestService/jersey/login/
	 */
	public void updateID(WebResource service){
		User user = new User();
		user.setUser_id("csm0222");
		user.setUser_age(30);
		user.setUser_email("change@korea.com");
		user.setUser_name("최성민123");
		
		ClientResponse updateResult = service.path("login").accept(MediaType.APPLICATION_XML).put(ClientResponse.class, user);
		System.out.println("updateResult : " + updateResult.getEntity(String.class));
	}

	/*
	 * 계정수정하기2(이미지 수정)
	 * http://localhost:8080/RestService/jersey/login/update/
	 */
	public void updateID2(WebResource service){

		File file = new File("c:\\localimg\\hello.jpg"); 

		FormDataMultiPart fdmp = new FormDataMultiPart(); 
		if (file != null) {
			fdmp.bodyPart(new FileDataBodyPart("user_img", file, MediaType.APPLICATION_OCTET_STREAM_TYPE)); 
			fdmp.bodyPart(new FormDataBodyPart("user_id", "csm0222")); 
			fdmp.bodyPart(new FormDataBodyPart("user_pwd", "seongmin")); 
			fdmp.bodyPart(new FormDataBodyPart("user_name", "Choi-Seong-Min")); 
		}else{
			System.out.println("파일이 없습니다!!");
		}
		ClientResponse createResult = service.path("login").path("update")
				.type(MediaType.MULTIPART_FORM_DATA_TYPE)
				.post(ClientResponse.class, fdmp);
		
         String string = createResult.getEntity(String.class); 

         System.out.println("updateResult : " + string); 
	}
	/*
	 * 계정삭제하기
	 * http://localhost:8080/RestService/jersey/login/delete/{user_id}/{user_pwd}
	 */
	public void deleteID(WebResource service){
		String deleteResult = service.path("login").path("delete")
				.path("csm0222")
				.path("seongmin")
				.get(String.class);
		System.out.println("deleteResult : " + deleteResult);
	}
	
	// 기본URI
	private static URI getBaseURI(){
		return UriBuilder.fromUri("http://localhost:8080/RestService/jersey").build();
	}
}
