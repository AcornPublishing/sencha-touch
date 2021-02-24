import java.net.*;

import javax.ws.rs.core.*;

import com.sun.jersey.api.client.*;
import com.sun.jersey.api.client.config.*;
import com.sun.jersey.api.representation.*;

public class HelloWorldCient
{
	public static void main(String[] args){
		// 기본 URI 요청 설정
		ClientConfig config = new DefaultClientConfig();
		Client client = Client.create(config);
		WebResource service = client.resource(getBaseURI());
		HelloWorldCient hw = new HelloWorldCient();
		hw.getCall(service);
		//hw.postCall(service);
	}

	private void getCall(WebResource service){
		String loginResult = service.path("helloworld")
									.path("seongmin")
									.accept(MediaType.TEXT_PLAIN)
									.get(String.class);
		System.out.println(loginResult);
	}

	private void postCall(WebResource service){
		Form f = new Form();
		f.add("x", "Xvalue");
		f.add("y", "Yvalue");
		String postResult = service.path("helloworld")
							.type(MediaType.APPLICATION_FORM_URLENCODED_TYPE)
							.post(String.class, f);

         System.out.println(postResult); 
	}
	
	// 기본 URI
	private static URI getBaseURI(){
		//return UriBuilder.fromUri("http://pscapps.com/RestService/jersey/").build();
		return UriBuilder.fromUri("http://localhost:8080/RestService/jersey/").build();
	}
}
