<%@page import="com.star.LoginDetails"%>
<%@page import="com.star.GetDataFromDB"%>
<%@page import="java.util.Date"%>
<%@ page import="java.io.*"%>


<%
String outputVal = "";

if (request.getMethod().equals("POST")) {

	String flag = request.getParameter("flag");
	String name = request.getParameter("name");
	String email = request.getParameter("email");
	String password = request.getParameter("password");

	LoginDetails obj = new LoginDetails();

	if (flag.equals("L")) {
		outputVal = obj.validateLogin(email, password);
	}

	else if (flag.equals("R")) {
		outputVal = obj.registerUser(name, email, password);
	}

	else if (flag.equals("RP")) {
		outputVal = obj.resetPassword(email, password);
	}

	System.out.println("flag :: " + flag + "|outputVal :: " + outputVal);
}
%>

<%=outputVal%>