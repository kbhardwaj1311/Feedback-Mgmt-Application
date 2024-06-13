package com.star;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.JsonObject;

public class LoginDetails {

	public String validateLogin(String email, String password) {
		Connection con = DBConnection.getDBConnection();
		ResultSet rs = null;
		PreparedStatement ps = null;
		String rtnSts = "";
		try {

			// rtnSts = ""; Login failed
			// rtnSts = "A"/"S"; Login success

			String query = "select role from user_detail where email=? and password=? ";
			ps = con.prepareStatement(query);
			ps.setString(1, email);
			ps.setString(2, password);
			rs = ps.executeQuery();
			if (rs.next()) {
				rtnSts = checkNull(rs.getString(1));
			}
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
		return rtnSts;
	}

	public String registerUser(String name, String email, String password) {
		Connection con = DBConnection.getDBConnection();
		PreparedStatement ps = null;
		int rtnSts = 0;
		try {

			// rtnSts = 0 ; fail
			// rtnSts = 1 ; success
			// rtnSts = 2 ; user already exist in database

			if (isUserExist(email, con)) {
				rtnSts = 2;
			} else {
				String query = "insert into user_detail values(?,?,?,'S')";
				ps = con.prepareStatement(query);
				ps.setString(1, name);
				ps.setString(2, email);
				ps.setString(3, password);
				System.out.println("Query >> " + ps.toString());
				rtnSts = ps.executeUpdate();
			}

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

	public String resetPassword(String email, String password) {
		Connection con = DBConnection.getDBConnection();
		PreparedStatement ps = null;
		int rtnSts = 0;
		try {

			// rtnSts = 0 ; fail/user does not exist in database
			// rtnSts = 1 ; success

			String query = "update user_detail set password=? where email=?";
			ps = con.prepareStatement(query);
			ps.setString(1, password);
			ps.setString(2, email);
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

	public boolean isUserExist(String email, Connection con) {
		ResultSet rs = null;
		PreparedStatement ps = null;
		boolean isUserExist = false;
		try {
			String query = "select * from user_detail where email=? and role='S'";
			ps = con.prepareStatement(query);
			ps.setString(1, email);
			System.out.println("Query >> " + ps.toString());
			rs = ps.executeQuery();
			if (rs.next()) {
				isUserExist = true;
			}
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
		return isUserExist;
	}

	public List<String> getPasswordByUser(String userId, Connection con) {
		PreparedStatement ps = null;
		ResultSet rs = null;
		List<String> list = new ArrayList<>();
		try {
			String query = "select password,lgn_actv from cstm_shp_tag_vldtn_usr where lgn_id=?";
			ps = con.prepareStatement(query);
			ps.setString(1, userId.trim());
			rs = ps.executeQuery();
			if (rs.next()) {
				list.add(checkNull(rs.getString(1)));
				list.add(checkNull(rs.getString(2)));
			}
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
		return list;
	}

	public String updateLoginStatus(String userId, String lgnActv, Connection con) {
		PreparedStatement ps = null;
		String lgnSession = "";
		try {
			String query = "update cstm_shp_tag_vldtn_usr set lgn_actv=?, lgn_dttm=now() where lgn_id=?";
			ps = con.prepareStatement(query);
			ps.setString(1, lgnActv);
			ps.setString(2, userId);
			int sts = ps.executeUpdate();

			if (sts == 1) {
				lgnSession = getLoginSession(userId, con);
			}
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
		}
		return lgnSession;
	}

	public String updateLoginSession(String userId) {
		Connection con = DBConnection.getDBConnection();
		PreparedStatement ps = null;
		String starLgnSession = "";
		JsonObject jsonObject = new JsonObject();
		try {
			String query = "update cstm_shp_tag_vldtn_usr set lgn_dttm=now() where lgn_id=?";
			ps = con.prepareStatement(query);
			ps.setString(1, userId);
			int sts = ps.executeUpdate();

			if (sts == 1) {
				starLgnSession = getLoginSession(userId, con);
			}
			jsonObject.addProperty("starLgnSession", starLgnSession);

			// Deleting all rows that is available in cstm_load_in_use
			ps.close();
			ps = null;
			query = "delete from cstm_load_in_use where lgn_id=?";
			ps = con.prepareStatement(query);
			ps.setString(1, userId);
			sts = ps.executeUpdate();

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
			if (ps != null) {
				try {
					ps.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return jsonObject.toString();
	}

	public String getLoginSession(String userId, Connection con) {
		PreparedStatement ps = null;
		ResultSet rs = null;
		String val = "";
		try {
			String query = "select to_char(lgn_dttm,'DD/MM/YYYY HH24:MI:SS') as lgn_dttm from"
					+ " cstm_shp_tag_vldtn_usr where lgn_id=?";
			ps = con.prepareStatement(query);
			ps.setString(1, userId);
			rs = ps.executeQuery();
			if (rs.next()) {
				val = checkNull(rs.getString(1));
			}

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
		return val;
	}

	public String getCrntLoginSession(String userId) {
		Connection con = DBConnection.getDBConnection();
		PreparedStatement ps = null;
		ResultSet rs = null;
		String crntLgnSession = "";
		JsonObject jsonObject = new JsonObject();
		try {
			String query = "select to_char(lgn_dttm,'DD/MM/YYYY HH24:MI:SS') as lgn_dttm from"
					+ " cstm_shp_tag_vldtn_usr where lgn_id=?";
			ps = con.prepareStatement(query);
			ps.setString(1, userId);
			rs = ps.executeQuery();
			if (rs.next()) {
				crntLgnSession = checkNull(rs.getString(1));
			}
			jsonObject.addProperty("crntLgnSession", crntLgnSession);
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
		return jsonObject.toString();
	}

	public String logOffSession(String userId) {
		Connection con = DBConnection.getDBConnection();
		PreparedStatement ps = null;
		int sts = 0;
		try {
			String query = "update cstm_shp_tag_vldtn_usr set lgn_actv='0', lgn_dttm=null where lgn_id=?";
			ps = con.prepareStatement(query);
			ps.setString(1, userId);
			sts = ps.executeUpdate();

			// Deleting all rows that is available in cstm_load_in_use
			ps.close();
			ps = null;
			query = "delete from cstm_load_in_use where lgn_id=?";
			ps = con.prepareStatement(query);
			ps.setString(1, userId);
			sts = ps.executeUpdate();

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
			if (ps != null) {
				try {
					ps.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return sts + "";
	}

	public String checkNull(String str) {
		if (str != null) {
			str = str.replace("\"", "@");
			str = str.replace("@", "\\\"");
			return (str == null ? "" : str.trim());
		} else {
			return "";
		}
	}

	public String checkLength(String str) {
		if (str == null) {
			str = "0";
		} else if (str.length() == 0) {
			str = "0";
		} else {
			str = str.trim();
		}

		return str;
	}

}
