package com.rest.Dao;

import java.util.*;

import javax.sql.*;

import org.springframework.beans.factory.annotation.*;
import org.springframework.jdbc.core.*;
import org.springframework.stereotype.*;

import com.rest.Vo.*;

/**  
 * @Class Name : TwitDao.java
 * @Description : 트위터Dao
 */
@Repository("TwitDao")
public class TwitDao
{
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

	/**
	 * 전체글갖고오기.
	 * @param user_id 트위터 주인 아이디
	 * @return List
	 * @exception Exception
	 */
	public List<Map<String, Object>> twitRead() throws Exception {
		String sql = "\n";
		sql = " SELECT  CAST(a.num AS CHAR) num, a.user_id, a.content, a.talking_img, a.reg_kind, a.reg_date, b.user_name, b.user_img FROM talking a, users b ";
		sql += " WHERE a.user_id = b.user_id";
		sql += " ORDER BY num desc";
		System.out.println(sql);
		return jdbcTemplate.queryForList(sql);
	}

	/**
	 * 최신글갖고오기.
	 * @param num 최근에 갖고온 인덱스 번호
	 * @return int
	 * @exception Exception
	 */
	public List<Map<String, Object>> twitReadRecent(int num) throws Exception {
		String sql = "\n";
		sql = " SELECT CAST(a.num AS CHAR) num, a.user_id, a.content, a.talking_img, a.reg_kind, a.reg_date, b.user_name, b.user_img FROM talking a, users b  ";
		sql += "\n WHERE  a.user_id = b.user_id ";
		sql += "\n   AND num > " + num;
		sql += "\n ORDER BY num desc";
		//sql += "\n LIMIT 0, 1";
		System.out.println(sql);
		return jdbcTemplate.queryForList(sql);
	}

	/**
	 * 글작성하기.
	 * @param user_id
	 * @param content
	 * @param reg_kind
	 * @param talking_img
	 * @return int
	 * @exception Exception
	 */
	public int twitWrite(String user_id, String content, String reg_kind, String talking_img) throws Exception {
		String sql = "\n";
		
		sql = " INSERT INTO talking ";
		sql += "\n (num, user_id, content, reg_kind, talking_img, reg_date) ";
		//sql += "\n values (";
		sql += "\n SELECT (IFNULL(MAX(num),0)+1) ";
		sql += "\n , '" + user_id + "'";
		sql += "\n , '" + content + "'";
		sql += "\n , '" + reg_kind + "'";
		sql += "\n , '" + talking_img + "'";
		sql += "\n , sysdate()";
		sql += "\n FROM talking";
		//sql += "\n )";

		System.out.println(sql);
		return jdbcTemplate.update(sql);
	}
}
