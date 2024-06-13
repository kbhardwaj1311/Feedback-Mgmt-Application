package com.star;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBConnection {

	public static Connection getDBConnection() {
		Connection con = null;

		try {
			String ipAdrr = "localhost";
			String port = "3306";
			String dbName = "prema_feedback_db";
			String userNm = "root";
			String pwd = "root";

			Class.forName("com.mysql.jdbc.Driver");
			System.out.println("Driver has been loaded.");
			String url = "jdbc:mysql://" + ipAdrr + ":" + port + "/" + dbName;
			con = DriverManager.getConnection(url, userNm, pwd);
			//System.out.println("Connection established.");
		} catch (Exception e) { 
			System.out.println(e);
		}

		return con;
	}
}

