//logic

	$("#saved").on({
		pagebeforeshow : function(){
			drawingApp.populateAlbumFolders();
	  }	
 });
	
	$("#savedImages").on({
		pagebeforeshow : function(){
			    var album_id = sessionStorage['clickedFolder'];
					drawingApp.populateSavedDrawings(album_id);
		}
		
	});
	
	
$(document).ready(function(){
	
	var $notification_message = $("#notification_message");
	$albums_selection = $("#albums_selection");
	$notification_message.hide();
	
	$("#save_drawing").on("vclick",function(){
		
		 var $drawing_name  = $("#drawing_name"),
		     drawing_name = $.trim($drawing_name.val()),
		 	 drawing_length = drawing_name.length,
		 	 album_id,
		 	 canSave = false;
		 	 
		   if($albums_selection.val() != "Create or Select Album" && $albums_selection.val()!="create" ){
			   		 console.log($albums_selection.val());
			   		 album_id = $albums_selection.val();
			   		 canSave = true;
		   			}else{
		   				$notification_message.html("Please select an album to save in.").css("color","red").fadeIn();
			    	    drawingApp.hide_notification_message();
		   				
		   			}
		 
		    
		  if(canSave){
		      if(drawing_length>15){
		    	// if the name has more than 15 characters, an error is shown
		    	     $notification_message.html("The drawing name needs to be less than 15 characters.").css("color","red").fadeIn();
		    	     $drawing_name.focus();
		    	     drawingApp.hide_notification_message();
		       }else if(drawing_name!=""){
		    	   // if the name is less then 15 characters and not empty, read the canvas data and pass it and the name to saveToLocal
		    	  var canvas_data = document.getElementById("canvas").toDataURL();
		    	      drawingApp.saveDrawingToLocal(drawing_name,canvas_data,album_id);
		    	      $drawing_name.val("").focus();
		      }
		      else{
		    	  // if it is empty, show an error message
		    	    $notification_message.html("Please enter the name of the drawing.").css("color","red").fadeIn();
		    	    drawingApp.hide_notification_message();
		    	    $drawing_name.focus();
		      }
		      
		  }  
		
	});
	
	
	$("#albums_selection").on("change",function(){
		
		$("#create_album").popup({
			overlayTheme : "a"
		});
		
		if($(this).val()=="create"){
			console.log("create new clicked");
			setTimeout(function(){
				$("#create_album").popup("open");
			},200);
			
		}
		
	});
	
	$("#save_album_name").on("vclick",function(e){
		
		if($.trim($("#album_name").val()) != "" && $.trim($("#album_name").val()).length < 15){
			if(!drawingApp.createAlbum($("#album_name").val())){
				$("#album_name_error").html("The album name already exists.").css("color","red");
			}else{
				$("#create_album").popup("close");
				$("#album_name").val("");
				setTimeout(function(){
					drawingApp.populateAlbums();
				},500);
			}
			
		}else if($.trim($("#album_name").val()).length > 15){
			$("#album_name_error").html("The album name needs to be less than 15 characters.").css("color","red");
			
		}else{
			$("#album_name_error").html("Please enter a name for your album.").css("color","red");
		}
		
	});
	
	$(".require_login").on("vclick",function(e){
		  try{
			  var loginDetails = JSON.parse(localStorage['login_details']);
			       if(loginDetails.auto_login){
			    	   // login the user
			    	   
			    	   if($(this).hasClass("chat")){
			    		   		$.mobile.changePage("#chat");
			    	   		}else if($(this.hasClass("showcase"))){
			    	        	$.mobile.changePage("#showcase");
			    	        }
			    	   
			       }else if(loginDetails.remember_login){
			    	   // populate user details
			    	     $("#username").val(loginDetails.username);
			    	     $("#password").val(loginDetails.password);
			    	     $.mobile.changePage("#login");
			    	   
			       }else{
			    	   $.mobile.changePage("#login");
			       }
		  }catch(ex){
			  $.mobile.changePage("#login");
		  }
		  e.preventDefault();
	});
	
	$("#btnRegister").on("vclick",function(){
		var details = {
				"username" : $("#username").val(),
				"password" : $("#password").val(),
				"password_2" : $("#password_2").val()
		}
		
		drawingApp.register(JSON.parse(details));
	});
	
	$("#btnLogin").on("vclick",function(){
		drawingApp.login($("#username").val(),$("#password").val());
	});

});