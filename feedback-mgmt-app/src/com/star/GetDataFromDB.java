package com.star;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

public class GetDataFromDB {

	public static String saveFeedback(String email, String course, String rating, String review) {
		Connection con = DBConnection.getDBConnection();
		PreparedStatement ps = null;
		int rtnSts = 0;
		try {

			// rtnSts = 0; Fail
			// rtnSts = 1; Success

			String query = "delete from feedback_detail where email=?";
			ps = con.prepareStatement(query);
			ps.setString(1, email);
			rtnSts = ps.executeUpdate();
			if (rtnSts == 1) {
				System.out.println("Record deleted successfully.");
			}
			rtnSts = 0;
			ps.close();
			ps = null;

			query = "insert into feedback_detail values(?,?,?,?)";
			ps = con.prepareStatement(query);
			ps.setString(1, email);
			ps.setString(2, course);
			ps.setString(3, rating);
			ps.setString(4, review);
			System.out.println("Query >> " + ps.toString());
			rtnSts = ps.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			if (ps != null) {
				try {
					ps.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			if (con != null) {
				try {
					con.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}

		}
		return rtnSts + "";
	}

	public static String getAllFeedback(String course) {
		Connection con = DBConnection.getDBConnection();
		ResultSet rs = null;
		PreparedStatement ps = null;
		JsonObject mainObject = new JsonObject();
		JsonArray jsonArray = new JsonArray();
		try {

			String query = "SELECT name,ud.email,course,rating,suggestion FROM user_detail AS ud"
					+ " JOIN feedback_detail AS fd ON ud.email = fd.email";
			if (course.length() > 0) {
				query += " and fd.course = ?";
			}
			ps = con.prepareStatement(query);
			if (course.length() > 0) {
				ps.setString(1, course);
			}
			rs = ps.executeQuery();
			while (rs.next()) {
				JsonObject jsonObject = new JsonObject();
				jsonObject.addProperty("name", checkNull(rs.getString(1)));
				jsonObject.addProperty("email", checkNull(rs.getString(2)));
				jsonObject.addProperty("course", checkNull(rs.getString(3)));
				jsonObject.addProperty("rating", checkNull(rs.getString(4)));
				jsonObject.addProperty("review", checkNull(rs.getString(5)));
				jsonArray.add(jsonObject);
			}

			mainObject.add("feedbackList", jsonArray);

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			if (rs != null) {
				try {
					rs.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			if (ps != null) {
				try {
					ps.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			if (con != null) {
				try {
					con.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return mainObject.toString();
	}

	public static String getAllFeedback(Connection con) {
		ResultSet rs = null;
		PreparedStatement ps = null;
		JsonObject mainObject = new JsonObject();
		JsonArray jsonArray = new JsonArray();
		try {

			String query = "SELECT name,ud.email,course,rating,suggestion FROM user_detail AS ud"
					+ " JOIN feedback_detail AS fd ON ud.email = fd.email";

			ps = con.prepareStatement(query);

			rs = ps.executeQuery();
			while (rs.next()) {
				JsonObject jsonObject = new JsonObject();
				jsonObject.addProperty("name", checkNull(rs.getString(1)));
				jsonObject.addProperty("email", checkNull(rs.getString(2)));
				jsonObject.addProperty("course", checkNull(rs.getString(3)));
				jsonObject.addProperty("rating", checkNull(rs.getString(4)));
				jsonObject.addProperty("review", checkNull(rs.getString(5)));
				jsonArray.add(jsonObject);
			}

			mainObject.add("feedbackList", jsonArray);

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			if (rs != null) {
				try {
					rs.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			if (ps != null) {
				try {
					ps.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return mainObject.toString();
	}

	public static String deleteFeedback(String email) {
		Connection con = DBConnection.getDBConnection();
		ResultSet rs = null;
		PreparedStatement ps = null;
		String result = "";
		try {

			String query = "delete from  feedback_detail where email = ? ";
			ps = con.prepareStatement(query);
			ps.setString(1, email);
			int rtnSts = ps.executeUpdate();
			
			result = getAllFeedback(con);

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			if (rs != null) {
				try {
					rs.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			if (ps != null) {
				try {
					ps.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			if (con != null) {
				try {
					con.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return result;
	}

	public static String checkNull(String val) {
		return val != null ? val.trim() : "";
	}
}
