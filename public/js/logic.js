//logic

	$("#saved").on({
		pageshow : function(){
		
		drawingApp.populateSavedDrawings();
		
	  }	
 });




$(document).ready(function(){
	
	var $notification_message = $("#notification_message");
	$notification_message.hide();
	
	$("#save_drawing").on("vclick",function(){
		
		 var $drawing_name  = $("#drawing_name");
		 var drawing_name = $.trim($drawing_name.val());
		 var drawing_length = drawing_name.length;
		  
		      if(drawing_length>15){
		    	// if the name has more than 15 characters, an error is shown
		    	     $notification_message.html("The drawing name needs to be less than 15 characters.").css("color","red").fadeIn();
		    	     $drawing_name.focus();
		    	     drawingApp.hide_notification_message();
		       }else if(drawing_name!=""){
		    	   // if the name is less then 15 characters and not empty, read the canvas data and pass it and the name to saveToLocal
		    	  var canvas_data = document.getElementById("canvas").toDataURL();
		    	      drawingApp.saveDrawingToLocal(drawing_name,canvas_data);
		    	      $drawing_name.val("").focus();
		      }
		      else{
		    	  // if it is empty, show an error message
		    	    $notification_message.html("Please enter the name of the drawing.").css("color","red").fadeIn();
		    	    drawingApp.hide_notification_message();
		    	    $drawing_name.focus();
		      }
		});
	
	
	
});


