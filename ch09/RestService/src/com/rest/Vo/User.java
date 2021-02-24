package com.rest.Vo;
import javax.xml.bind.annotation.*;

@XmlRootElement
public class User
{
	String user_id;
	String user_pwd;
	String user_name;
	int user_age;
	String user_email;
	String user_img;
	
	
	public String getUser_id(){
		return user_id;
	}
	public void setUser_id(String user_id){
		this.user_id = user_id;
	}
	public String getUser_pwd(){
		return user_pwd;
	}
	public void setUser_pwd(String user_pwd){
		this.user_pwd = user_pwd;
	}
	public String getUser_name(){
		return user_name;
	}
	public void setUser_name(String user_name){
		this.user_name = user_name;
	}
	public int getUser_age(){
		return user_age;
	}
	public void setUser_age(int user_age){
		this.user_age = user_age;
	}
	public String getUser_email(){
		return user_email;
	}
	public void setUser_email(String user_email){
		this.user_email = user_email;
	}
	public String getUser_img(){
		return user_img;
	}
	public void setUser_img(String user_img){
		this.user_img = user_img;
	}
	
}
