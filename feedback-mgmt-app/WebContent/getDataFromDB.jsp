<%@page import="com.star.GetDataFromDB"%>
<%@page import="java.util.Date"%>
<%@ page import="java.io.*"%>


<%
	String outputVal = "";
String TMP_PATH = "";

if (System.getenv("SERVER") != null) {
	TMP_PATH = "/tmp/";
} else {
	TMP_PATH = "C:\\Users\\Nawab-pc\\Desktop\\tmp\\";
}

if (request.getMethod().equals("POST")) {
	String flag = request.getParameter("flag");
	String email = request.getParameter("email");
	String course = request.getParameter("course");
	String rating = request.getParameter("rating");
	String review = request.getParameter("review");

	if (flag.equals("S")) {
		outputVal = GetDataFromDB.saveFeedback(email,course,rating,review);
	} 
	
	else if (flag.equals("G")) {
		outputVal = GetDataFromDB.getAllFeedback(course);
	} 
	
	else if (flag.equals("D")) {
		outputVal = GetDataFromDB.deleteFeedback(email);
	}
	System.out.println("param :: " + flag + "|outputVal :: " + outputVal);
}

%>

<%=outputVal%>