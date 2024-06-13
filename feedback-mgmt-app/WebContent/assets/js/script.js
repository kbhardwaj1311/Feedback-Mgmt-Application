/*
	Created By   :- Kundan Kumar
	Created Date :- 01 Jan, 2024
	Description  :- .
*/

var dbURL = 'getDataFromDB.jsp';

$(document).ready(function(){
	
	var role = localStorage.getItem("role");
	console.log("role >> "+role);
	
	if(role === "A"){
		getAllFeedback("");
		
		$("#search").click(function() {
			var course = $("#lang").val().trim().toUpperCase();
			getAllFeedback(course);
		});
		
		$("#clear").click(function() {
			$("#lang").val("").trigger("change");
		});
		
		// Event delegation to handle clicks on delete icons within the specific table
		$("#feedbackTblTBody").on('click', '.btnDelete', function() {
		    var email = $(this).data('email');
		    console.log('Delete clicked for email: ' + email);
		    // Add your delete handling code here
			deleteFeedback(email);
		});
		
	}
	
	else if(role === "S"){
		var rating = 0;
		$("#btn1, #btn2, #btn3, #btn4, #btn5").click(function() {
	        rating = $(this).val().trim();
	        makeRating(rating);
	    });
	
		$("#saveFeedback").click(function() {
			if(localStorage.getItem("role") !=null){
				var review = $("#review").val().trim();
				var course = $("#course").val().trim();
		        if(rating > 0 && review.length > 0){
					saveFeedback(course,rating,review);
				}else{
					alert("Please check your rating and comment.");
				}
			}
			else{
				window.location.replace("login.html");
			}       
	    });
	}
	
	else{
		window.location.replace("index.html");
	}
	
	$("#logOut").click(function() {
		localStorage.removeItem("role");
		localStorage.removeItem("email");
		window.location.replace("index.html");
	});
	
});	
	

function deleteFeedback(email){
	$("#mainLoader").show();
    $.ajax({
	    data: {
	    	flag: "D",
			email:email ,
	        course: "" ,
	        rating:"",
			review:"",
		},
	    url: dbURL,
	    type: 'POST',
	    dataType: 'text',
	    success: function(data) {
	     	console.log("deleteFeedback = "+data);
			if (IsJsonString(data.trim())){
				var response = JSON.parse(data.trim());
				var jsonArray = response.feedbackList;
				var tblRows = '';
				for (var i = 0; i < jsonArray.length; i++) {
					tblRows += '<tr>'
						+ '<td>' + (i + 1) + '</td>'
						+ '<td>' + jsonArray[i].name + '</td>'
						+ '<td>' + jsonArray[i].email + '</td>'
						+ '<td>' + jsonArray[i].course + '</td>'
						+ '<td>' + jsonArray[i].rating + '</td>'
						+ '<td>' + jsonArray[i].review + '</td>'
						//+ '<td><i class="fa fa-trash text-danger" aria-hidden="true" value="' + jsonArray[i].email + '"></i></td>'
						+ '<td><button class="btnDelete" data-email="' + jsonArray[i].email + '"><i class="fa fa-trash text-danger" aria-hidden="true"></i></button></td>'
						+ '</tr>';
				}
				console.log("tblRows = " + tblRows);
				$("#feedbackTblTBody").html(tblRows);
				$("#feedbackTblTBody").show();
				$("#mainLoader").hide();
			}
				
	    },
	    error: function() {
	    	$("#mainLoader").hide();
	    }
    });
}

function getAllFeedback(course){
	$("#mainLoader").show();
    $.ajax({
	    data: {
	    	flag: "G",
			email:"" ,
	        course: course ,
	        rating:"",
			review:"",
		},
	    url: dbURL,
	    type: 'POST',
	    dataType: 'text',
	    success: function(data) {
	     	console.log("getAllFeedback = "+data);
			if (IsJsonString(data.trim())){
				var response = JSON.parse(data.trim());
				var jsonArray = response.feedbackList;
				var tblRows = '';
				for (var i = 0; i < jsonArray.length; i++) {
					tblRows += '<tr>'
						+ '<td>' + (i + 1) + '</td>'
						+ '<td>' + jsonArray[i].name + '</td>'
						+ '<td>' + jsonArray[i].email + '</td>'
						+ '<td>' + jsonArray[i].course + '</td>'
						+ '<td>' + jsonArray[i].rating + '</td>'
						+ '<td>' + jsonArray[i].review + '</td>'
						//+ '<td><i class="fa fa-trash text-danger" aria-hidden="true" value="' + jsonArray[i].email + '"></i></td>'
						+ '<td><button class="btnDelete" data-email="' + jsonArray[i].email + '"><i class="fa fa-trash text-danger" aria-hidden="true"></i></button></td>'
						+ '</tr>';
				}
				console.log("tblRows = " + tblRows);
				$("#feedbackTblTBody").html(tblRows);
				$("#feedbackTblTBody").show();
				$("#mainLoader").hide();

			}
				
	    },
	    error: function() {
	    	$("#mainLoader").hide();
	    }
    });
}


function saveFeedback(course,rating,review){
	$("#mainLoader").show();
    $.ajax({
	    data: {
	    	flag: "S",
			email:localStorage.getItem("email") ,
	        course: course ,
	        rating:rating,
			review:review,
		},
	    url: dbURL,
	    type: 'POST',
	    dataType: 'text',
	    success: function(data) {
	     	console.log("saveFeedback = "+data);

			// rtnSts = 0; Fail
			// rtnSts = 1; Success
			
			if(data === "1"){
				alert("Feedback submitted.");
			}
			else {
				alert("Error occured while saving records.");	
			} 
			$("#mainLoader").hide();	
	    },
	    error: function() {
	    	$("#mainLoader").hide();
	    }
    });
}

		
function makeRating(rating) {
    for (var i = 1; i <= 5; i++) {
        if (i >= 1 && i <= rating) {
            $("#btn" + i).addClass("highlighted");
        } else {
            $("#btn" + i).removeClass("highlighted");
        }
    }
}
	
	
	
/*$("#signOut").click(function(){
	logOffSession(localStorage.getItem("shpTagVldtnUsrId"));
	
	localStorage.removeItem("shpTagVldtnUsrId");	
	localStorage.removeItem("starLgnSession");					
	window.location.replace("login.html");
});*/
	
	



// **********************************************************************************************

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
