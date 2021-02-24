package com.rest.Dao;

import java.util.*;

import javax.sql.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.jdbc.core.*;
import org.springframework.stereotype.*;
import com.rest.Vo.*;

/**  
 * @Class Name : LoginDao.java
 * @Description : 로그인DAO
 */
@Repository("LoginDao")
public class LoginDao
{
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

	/**
	 * 로그인.
	 * @param user_id 사용자 아이디
	 * @return Map
	 * @exception Exception
	 */
	public Map<String, Object> selectLogin(String user_id) throws Exception {
		String sql = "\n";
		sql = " SELECT user_name as userName,user_pwd FROM users ";
		sql += " WHERE user_id = '" + user_id + "'";
		try{
			System.out.println(sql);
			return jdbcTemplate.queryForMap(sql);
		}catch(Exception ex){
			System.out.println(ex);
			return new HashMap<String, Object>();
		}
	}

	/**
	 * 계정생성.
	 * @param user_id 사용자 아이디
	 * @param user_pwd 사용자 비밀번호
	 * @param user_name 사용자 이름
	 * @param user_age 사용자 나이
	 * @param user_email 사용자 이메일주소
	 * @return int
	 * @exception Exception
	 */
	public int createID(String user_id, String user_pwd, String user_name, String user_age, String user_email) throws Exception {
		String sql = "\n";
		sql = " INSERT INTO users (user_id, user_pwd, user_name,user_age, user_email, reg_date)";
		sql += "\n VALUES (";
		sql += "\n '" + user_id + "'";
		sql += "\n ,'" + user_pwd + "'";
		sql += "\n ,'" + user_name + "'";
		sql += "\n ,'" + user_age + "'";
		sql += "\n ,'" + user_email + "'";
		sql += "\n , sysdate()";
		sql += "\n )";
		System.out.println(sql);
		return jdbcTemplate.update(sql);
	}

	/**
	 * 계정생성2.
	 * @param user_id 사용자 아이디
	 * @param user_pwd 사용자 비밀번호
	 * @param user_name 사용자 이름
	 * @param user_img 사용자가 등록한 파일명
	 * @return int
	 * @exception Exception
	 */
	public int createID2(String user_id, String user_pwd, String user_name, String user_img) throws Exception {
		String sql = "\n";
		sql = " INSERT INTO users (user_id, user_pwd, user_name, user_img, reg_date)";
		sql += "\n VALUES (";
		sql += "\n '" + user_id + "'";
		sql += "\n ,'" + user_pwd + "'";
		sql += "\n ,'" + user_name + "'";
		sql += "\n ,'" + user_img + "'";
		sql += "\n , sysdate()";
		sql += "\n )";
		System.out.println(sql);
		return jdbcTemplate.update(sql);
	}
	
	/**
	 * 계정수정.
	 * @param user User
	 * @return int
	 * @exception Exception
	 */
	public int updateID(User user) throws Exception {
		String sql = "\n";
		sql = " UPDATE users ";
		sql += "\n SET ";
		boolean comma = false;
		
		if(user.getUser_pwd() != null){
			comma = true;
			sql += "\n user_pwd = '" + user.getUser_pwd() + "'";
		}
		if(user.getUser_name() != null){
			if(comma) sql += "\n , ";
			comma = true;
			sql += " user_name = '" + user.getUser_name() + "'";
		}
		if(user.getUser_age() != 0){
			if(comma) sql += "\n , ";
			comma = true;
			sql += " user_age = " + user.getUser_age() + "";
		}
		if(user.getUser_email() != null){
			if(comma) sql += "\n , ";
			comma = true;
			sql += " user_email = '" + user.getUser_email() + "'";
		}
		
		if(comma) sql += "\n , ";
		
		sql += " reg_date = sysdate()";
		
		sql += "\n WHERE user_id = '" + user.getUser_id() + "'";

		System.out.println(sql);
		return jdbcTemplate.update(sql);
	}

	/**
	 * 계정수정2.
	 * @param user_id 사용자 아이디
	 * @param user_pwd 사용자 비밀번호
	 * @param user_name 사용자 이름
	 * @param user_img 사용자가 등록한 파일명
	 * @return int
	 * @exception Exception
	 */
	public int updateID2(String user_id, String user_pwd, String user_name, String user_img) throws Exception {
		String sql = "\n";
		sql = " UPDATE users ";
		sql += "\n SET ";
		boolean comma = false;
		
		if(user_pwd != null){
			comma = true;
			sql += "\n user_pwd = '" + user_pwd + "'";
		}
		if(user_name != null){
			if(comma) sql += "\n , ";
			comma = true;
			sql += " user_name = '" + user_name + "'";
		}
		if(user_img != null){
			if(comma) sql += "\n , ";
			comma = true;
			sql += " user_img = '" + user_img + "'";
		}
		
		if(comma) sql += "\n , ";
		
		sql += " reg_date = sysdate()";
		
		sql += "\n WHERE user_id = '" + user_id + "'";

		System.out.println(sql);
		return jdbcTemplate.update(sql);
	}


	/**
	 * 계정삭제.
	 * @param user_id 사용자 아이디
	 * @param user_pwd 사용자 비밀번호
	 * @return int
	 * @exception Exception
	 */
	public int deleteID(String user_id, String user_pwd) throws Exception {
		String sql = "\n";
		sql = " DELETE FROM users ";
		sql += "\n WHERE user_id = '" + user_id + "'";
		sql += "\n   AND user_pwd = '" + user_pwd + "'";
		System.out.println(sql);
		return jdbcTemplate.update(sql);
	}
}
