
var dbURL = 'password-details.jsp';

$(function(){
	
	$("#btnRegister").click(function(){
		console.log("********** btnRegister ***********");
		var error = false;
		
		var name = $("#name").val();
		var email = $("#email").val();
		var password = $("#password").val();
		var confirmPassword = $("#confirmPassword").val();
		
		if( name == undefined || name == "" || name.trim().length == 0 ){
			error = true;
			$("#name").addClass("border-danger");
		}
		
		if( email == undefined || email == "" || email.trim().length == 0 ){
			error = true;
			$("#email").addClass("border-danger");
		}
		
		if( password == undefined || password == "" || password.trim().length == 0 ){
			error = true;
			$("#password").addClass("border-danger");
		}
		
		if( confirmPassword == undefined || confirmPassword == "" || confirmPassword.trim().length == 0 ){
			error = true;
			$("#confirmPassword").addClass("border-danger");
		}
		
		if(password != confirmPassword){
			//customAlert("#popupNotify", "alert-danger", "<b>Password and confirm password should be same.</b>");		
			alert("Password and confirm password should be same.");	
			return;
		}
		
		if( error == false ){
			registerUser(name,email,password);
		}else{		
			//customAlert("#popupNotify", "alert-danger", "<b>Please check given details.</b>");
			alert("Please check given details.");		    
		}
		
	});
	
	
	$("#btnResetPassword").click(function(){
		console.log("********** btnResetPassword ***********");
		var error = false;
		
		var email = $("#email").val();
		var password = $("#password").val();
		var confirmPassword = $("#confirmPassword").val();
		
		
		if( email == undefined || email == "" || email.trim().length == 0 ){
			error = true;
			$("#email").addClass("border-danger");
		}
		
		if( password == undefined || password == "" || password.trim().length == 0 ){
			error = true;
			$("#password").addClass("border-danger");
		}
		
		if( confirmPassword == undefined || confirmPassword == "" || confirmPassword.trim().length == 0 ){
			error = true;
			$("#confirmPassword").addClass("border-danger");
		}
		
		if(password != confirmPassword){
			//customAlert("#popupNotify", "alert-danger", "<b>Password and confirm password should be same.</b>");		
			alert("Password and confirm password should be same.");	
			return;
		}
		
		if( error == false ){
			resetPassword(email,password);
		}else{		
			//customAlert("#popupNotify", "alert-danger", "<b>Please check given details.</b>");
			alert("Please check given details.");		    
		}
		
	});
	
	$("#btnLogin").click(function(){
		console.log("********** btnLogin ***********");
		var error = false;
		
		var email = $("#email").val();
		var password = $("#password").val();
		
		
		if( email == undefined || email == "" || email.trim().length == 0 ){
			error = true;
			$("#email").addClass("border-danger");
		}
		
		if( password == undefined || password == "" || password.trim().length == 0 ){
			error = true;
			$("#password").addClass("border-danger");
		}
		
		
		if( error == false ){
			validateLogin(email,password);
		}else{		
			//customAlert("#popupNotify", "alert-danger", "<b>Please check given details.</b>");
			alert("Please check given details.");		    
		}
		
	});

	
});


function validateLogin(email,password){
	$("#mainLoader").show();
    $.ajax({
	    data: {
	    	flag: "L",
	        name: "",
	        email:email,
	        password:password,
		},
	    url: dbURL,
	    type: 'POST',
	    dataType: 'text',
	    success: function(data) {
	     	console.log("validateLogin = "+data);

			/// rtnSts = ""; Login failed
			// rtnSts = "A"/"S"; Login success
			
			if(data === "S"){
				localStorage.setItem("email", email);
		       	localStorage.setItem("role", "S");
				window.location.replace("student.html");
			}
			else if(data === "A"){
				localStorage.setItem("email", email);
		        localStorage.setItem("role", "A");
				window.location.replace("admin.html");	
			} else{
				localStorage.removeItem("email");
				localStorage.removeItem("role");
				alert("Please check your email and password.");		
			}
			$("#mainLoader").hide();	
	    },
	    error: function() {
	    	$("#mainLoader").hide();
	    }
    });
}


function resetPassword(email,password){
	$("#mainLoader").show();
    $.ajax({
	    data: {
	    	flag: "RP",
	        name: "",
	        email:email,
	        password:password,
		},
	    url: dbURL,
	    type: 'POST',
	    dataType: 'text',
	    success: function(data) {
	     	console.log("resetPassword = "+data);

			// rtnSts = 0 ; fail/user does not exist in database
			// rtnSts = 1 ; success
			
			if(data === "0"){
				alert("fail/user does not exist in database");
			}
			else if(data === "1"){
				alert("Password reset successfully, please login");
				window.location.replace("index.html");
			} 
			$("#mainLoader").hide();	
	    },
	    error: function() {
	    	$("#mainLoader").hide();
	    }
    });
}


/** **/ 
function registerUser(name,email,password){
	$("#mainLoader").show();
	
    $.ajax({
	    data: {
	    	flag: "R",
	        name: name,
	        email:email,
	        password:password,
		},
	    url: dbURL,
	    type: 'POST',
	    dataType: 'text',
	    success: function(data) {
	     	console.log("registerUser = "+data);

			// rtnSts = 0 ; fail
			// rtnSts = 1 ; success
			// rtnSts = 2 ; user already exist in database
			
			if(data === "0"){
				alert("Fail");
			}
			else if(data === "2"){
				alert("user already exist in database");
			}
			else if(data === "1"){
				alert("Registered successfully, please login");
				window.location.replace("index.html");
			} 
			$("#mainLoader").hide();	
	    },
	    error: function() {
	    	$("#mainLoader").hide();
	    }
    });
	
}


function customAlert(alertArea, alertType, alertMessage){
	var uniqueId = new Date().valueOf();
	var message = '<div style="display:none;" class="alert ' + alertType + ' alert-dismissible mb-3" role="alert" id="cstmAlert-'+ uniqueId +'">' +
					'<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
						'<span aria-hidden="true">×</span>' +
					'</button>' + alertMessage +
				'</div>';
	$(alertArea).html( message );
	$("#cstmAlert-" + uniqueId).slideDown();
	
	$('html, body, .content-wrapper').animate({
        scrollTop: $(alertArea).offset().top - 100
    }, 'slow');
	
	setTimeout(function(){
		if( $("#cstmAlert-" + uniqueId).length ){
			$("#cstmAlert-" + uniqueId).slideUp(1000, function(){
				$(this).remove();
			})
		}
	}, 10000);
}


function checkNull(str){
	if(str == null){
		return "";
	}else if(str.trim() == "-"){
		return "";
	}else{
		return str.trim();
	}
}

function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

/**
 *	This function is validating for valid JSON String
 */
function IsJsonString(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}

/**
 *	This function is used to allow only numbers in textbox
 */
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function validateDate(date) {

	var dateMMDDYYYRegex = "^[0-9]{2}/[0-9]{2}/[0-9]{4}$";
    if(date.match(dateMMDDYYYRegex) && isValidDate(date))	
	{
		return true;
	}
	else
	{
		return false;
	}
    
    /*var dateRegex = /^\d{2}\/\d{2}\/\d{4}$/ ;
    return dateRegex.test(date);*/
}

function validateTime(time) {
    var timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ ;
    return timeRegex.test(time);
}

 function isValidDate(s) {
       var bits = s.split('/');
       var d = new Date(bits[2], bits[0] - 1, bits[1]);
       return d && (d.getMonth() + 1) == bits[0] && d.getDate() == Number(bits[1]);
    }
	
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function closeAlertBox(){
	window.setTimeout(function () {
	  $("#msgAlertBox").fadeOut(300)
	}, 3000);
}

function customAlertTop(errList, divClass){
	$(".notify").toggleClass("active-alert");		            	
	$(".notify").addClass(divClass);
	$("#notifyType").html(errList);
	
	setTimeout(function(){
		$(".notify").removeClass("active-alert");
	},3000);	         
}
