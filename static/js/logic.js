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
			  
			  sessionStorage['navigate_to'] = $(this).hasClass("showcase") ? "showcase" : "chat";
		if(!sessionStorage['user_logged']){
				  
			  
			  var loginDetails = JSON.parse(localStorage['login_details']);
			       if(loginDetails.auto_login){
			    	   // login the user
			    	   
			    	   if($(this).hasClass("chat")){
			    		        socket.emit("login",loginDetails.username);
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
			    	   $("#username").val(loginDetails.username);
			    	   $("#password").val(loginDetails.password);
			       }
			       
			  }else{
				  
				  $.mobile.changePage("#"+sessionStorage['navigate_to']);
			  }
			  
		  }catch(ex){
			  $.mobile.changePage("#login");
		  }
		  e.preventDefault();
	});
	
	$("#btnRegister").on("vclick",function(e){
		
		var details = {
				"username" : $("#username").val(),
				"password" : $("#password").val(),
				"password_2" : $("#password_2").val()
		}
		
		drawingApp.register(JSON.parse(details));
		e.preventDefault();
	});
	
	$("#btnLogin").on("vclick",function(e){
		
		console.log($("#username").val());
		console.log($("#password").val());
		
		 var username = $.trim($("#username").val()),
	         password = $.trim($("#password").val());
		 
		 localStorage["login_details"] = JSON.stringify({
			   "username" : username,
			   "password" : password
				 
		 });
		 
		drawingApp.login({
			   "username" : username,
			   "password" : password
				 
		 });
		
		e.preventDefault();
		
	});
	
	$("#clear_message").on("vclick",function(e){
		
		$("#chat_message").val("");
		
		e.preventDefault();
	});
	
	$("#send_message").on("vclick",function(e){
		
		var message = $("#chat_message").val();
		
		//$("#chat_content").append(["<li><h3>Me</h3><p>",message,"</p></li>"].join('')); 
		$("#chat_content").append(["<li class='ui-li ui-li-static ui-btn-up-a ui-corner-top'><h3 class='ui-li-heading'>Me</h3><p class='ui-li-desc'>",message,"</p><p class='ui-li-desc'></p></li>"].join('')); 
		socket.emit("chat_message",message);
		$("#chat_message").val("");
		
		
		e.preventDefault();
	});
	
	$("#chat_content").on("dropenter",function(e){
	
		e.stopPropagation();
		e.preventDefault();
	}).on("dropover",function(e){
		console.log("dropover");
		e.stopPropagation();
		e.preventDefault();
	}).on("dropleave",function(e){
		
		e.stopPropagation();
		e.preventDefault();
	});
	
	$(document).on("drop",function(e){
		
		e.preventDefault();
		
	});
	
	document.getElementById("chat_content").addEventListener("drop",function(e){
		
		
		console.log(e.dataTransfer.files.length);
		var file = e.dataTransfer.files[0];
		
		console.log(file);
		file.getType(function(file_type){
			console.log(file_type)
			if(file_type=="image"){
				
				file.getName(function(file_name){
			
					file.getFormat(function(file_format){

						file.readDataURL(function(image_data){
							
							var objImageData = {
									  "file_name" : file_name,
									"file_format" : file_format,
									 "image_data" : image_data,
									  "timestape" : new Date().getTime()
							};
							
							$("#chat_content").append(["<li class='ui-li ui-li-static ui-btn-up-a ui-corner-top'><h3 class='ui-li-heading'>Me</h3><p class='ui-li-desc'><img src='",image_data,"' alt='image' /></p><p class='ui-li-desc'></p></li>"].join('')); 
							socket.emit("send_image",JSON.stringify(objImageData));
							
						},function(e){
							
							console.log("Error reading file");
						});
						
					},function(e){
						
						console.log("Could not get format");
					});
					
				},function(e){
					
					console.log("Error reading file name");
					
				});
				
			}else{
				
				console.log("you can upload images only");
			}
		});
		
		
		e.stopPropagation();
		e.preventDefault();
		
	});

});