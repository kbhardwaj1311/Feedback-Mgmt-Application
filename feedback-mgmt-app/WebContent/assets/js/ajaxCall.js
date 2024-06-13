/*
	CRETAED BY 		- ABIZAR HASAN
	CREATED DATE 	- 21 APRIL 2017
	DESCRIPTION		- COMMON AJAX FUNCTION CALL

*/

function doAjax(doAjax_params) {


    var url = doAjax_params['url'];
    var requestType = doAjax_params['requestType'];
    var contentType = doAjax_params['contentType'];
    var dataType = doAjax_params['dataType'];
    var data = doAjax_params['data'];
    var beforeSendCallbackFunction = doAjax_params['beforeSendCallbackFunction'];
    var successCallbackFunction = doAjax_params['successCallbackFunction'];
    var completeCallbackFunction = doAjax_params['completeCallbackFunction'];
    var errorCallBackFunction = doAjax_params['errorCallBackFunction'];
	
    $.ajax({
        url: url,
        type: requestType,
        dataType: dataType,
        data: data,
        beforeSend: function(jqXHR, settings) {
            if (typeof beforeSendCallbackFunction === "function") {
                beforeSendCallbackFunction();
            }
        },
        success: function(out, textStatus, jqXHR) {    
            if (typeof successCallbackFunction === "function") {
                successCallbackFunction(out);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
			
            if (typeof errorCallBackFunction === "function") {
                errorCallBackFunction(errorThrown);
            }

        },
        complete: function(jqXHR, textStatus) {
            if (typeof completeCallbackFunction === "function") {
                completeCallbackFunction();
            }
        }
    });
}
