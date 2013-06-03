// Copyright 2010 William Malone (www.williammalone.com)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/*jslint browser: true */
/*global G_vmlCanvasManager */

var drawingApp = (function (socket) {

	"use strict";

	var canvas,
		context,
		colorCanvas,
		colorContext,
		canvasWidth = 490,
		canvasHeight = 220,
		colorPurple = "#cb3594",
		colorGreen = "#659b41",
		colorYellow = "#ffcf33",
		colorBrown = "#986928",
		outlineImage = new Image(),
		crayonImage = new Image(),
		markerImage = new Image(),
		eraserImage = new Image(),
		crayonBackgroundImage = new Image(),
		markerBackgroundImage = new Image(),
		eraserBackgroundImage = new Image(),
		crayonTextureImage = new Image(),
		previous = new Image(),
		next = new Image(),
		clickX = [],
		clickY = [],
		clickColor = [],
		clickTool = [],
		clickSize = [],
		clickDrag = [],
		paint = false,
		curColor = colorPurple,
		curTool = "crayon",
		curSize = "normal",
		mediumStartX = 18,
		mediumStartY = 19,
		mediumImageWidth = 93,
		mediumImageHeight = 46,
		drawingAreaX = 111,
		drawingAreaY = 11,
		drawingAreaWidth = 267,
		drawingAreaHeight = 200,
		toolHotspotStartY = 23,
		toolHotspotHeight = 38,
		sizeHotspotStartY = 157,
		sizeHotspotHeight = 36,
		totalLoadResources = 10,
		curLoadResNum = 0,
		sizeHotspotWidthObject = {
			huge: 39,
			large: 25,
			normal: 18,
			small: 16
		},
		colorCanvasWidth = 490,
		colorCanvasHeight = 200,
		colorCanvasCrayonAreaWidth = 200,
		colorCanvasCrayonAreaHeight = 170,
		colorCanvasContext,
		colorCrayonsX = [220,220,220,220,220,220,220,220,220,220,220,220],
		colorCrayonsY = [10,50,90,130,170,210,250,290,330,370,410,450,490],
		colorCrayonsColor = new Array("gold","orange","red","lime","pink","navy","grey","black","blue","brown","teal","maroon","silver"),
		colorCrayons = new Array(),
		colorCanvasDividerOneX = 200,
		colorCanvasDividerTwoX = 330,
		cleanAlbumsDropDown,
				
		

		// Clears the canvas.
		clearCanvas = function () {

			context.clearRect(0, 0, canvasWidth, canvasHeight);
		},
		// Clears the drawing area
		clearDrawing = function(){
			
			context.clearRect(0,0,drawingAreaWidth,drawingAreaHeight);
			clickX.length = 0;
			clickY.length = 0;
			clickColor.length = 0;
			clickTool.length = 0;
			clickSize.length = 0;
			clickDrag.length = 0;
			redraw();
		},

		// Redraws the canvas.
		redraw = function () {

			var locX,
				locY,
				radius,
				i,
				selected,

				drawCrayon = function (x, y, color, selected) {

					context.beginPath();
					context.moveTo(x + 41, y + 11);
					context.lineTo(x + 41, y + 35);
					context.lineTo(x + 29, y + 35);
					context.lineTo(x + 29, y + 33);
					context.lineTo(x + 11, y + 27);
					context.lineTo(x + 11, y + 19);
					context.lineTo(x + 29, y + 13);
					context.lineTo(x + 29, y + 11);
					context.lineTo(x + 41, y + 11);
					context.closePath();
					context.fillStyle = color;
					context.fill();

					if (selected) {
						context.drawImage(crayonImage, x, y, mediumImageWidth, mediumImageHeight);
					} else {
						context.drawImage(crayonImage, 0, 0, 59, mediumImageHeight, x, y, 59, mediumImageHeight);
					}
				},

				drawMarker = function (x, y, color, selected) {

					context.beginPath();
					context.moveTo(x + 10, y + 24);
					context.lineTo(x + 10, y + 24);
					context.lineTo(x + 22, y + 16);
					context.lineTo(x + 22, y + 31);
					context.closePath();
					context.fillStyle = color;
					context.fill();

					if (selected) {
						context.drawImage(markerImage, x, y, mediumImageWidth, mediumImageHeight);
					} else {
						context.drawImage(markerImage, 0, 0, 59, mediumImageHeight, x, y, 59, mediumImageHeight);
					}
				};

			// Make sure required resources are loaded before redrawing
			if (curLoadResNum < totalLoadResources) {
				return;
			}

			clearCanvas();

			if (curTool === "crayon") {

				// Draw the crayon tool background
				context.drawImage(crayonBackgroundImage, 0, 0, canvasWidth, canvasHeight);

				// Draw purple crayon
				selected = (curColor === colorPurple);
				locX = selected ? 18 : 52;
				locY = 19;
				drawCrayon(locX, locY, colorPurple, selected);

				// Draw green crayon
				selected = (curColor === colorGreen);
				locX = selected ? 18 : 52;
				locY += 46;
				drawCrayon(locX, locY, colorGreen, selected);

				// Draw yellow crayon
				selected = (curColor === colorYellow);
				locX = selected ? 18 : 52;
				locY += 46;
				drawCrayon(locX, locY, colorYellow, selected);

				// Draw brown crayon
				selected = (curColor === colorBrown);
				locX = selected ? 18 : 52;
				locY += 46;
				drawCrayon(locX, locY, colorBrown, selected);

			} else if (curTool === "marker") {

				// Draw the marker tool background
				context.drawImage(markerBackgroundImage, 0, 0, canvasWidth, canvasHeight);

				// Draw purple marker
				selected = (curColor === colorPurple);
				locX = selected ? 18 : 52;
				locY = 19;
				drawMarker(locX, locY, colorPurple, selected);

				// Draw green marker
				selected = (curColor === colorGreen);
				locX = selected ? 18 : 52;
				locY += 46;
				drawMarker(locX, locY, colorGreen, selected);

				// Draw yellow marker
				selected = (curColor === colorYellow);
				locX = selected ? 18 : 52;
				locY += 46;
				drawMarker(locX, locY, colorYellow, selected);

				// Draw brown marker
				selected = (curColor === colorBrown);
				locX = selected ? 18 : 52;
				locY += 46;
				drawMarker(locX, locY, colorBrown, selected);

			} else if (curTool === "eraser") {

				context.drawImage(eraserBackgroundImage, 0, 0, canvasWidth, canvasHeight);
				context.drawImage(eraserImage, 18, 19, mediumImageWidth, mediumImageHeight);
			}

			// Draw line on ruler to indicate size
			switch (curSize) {
			case "small":
				locX = 467;
				break;
			case "normal":
				locX = 450;
				break;
			case "large":
				locX = 428;
				break;
			case "huge":
				locX = 399;
				break;
			default:
				break;
			}
			locY = 189;
			context.beginPath();
			context.rect(locX, locY, 2, 12);
			context.closePath();
			context.fillStyle = '#333333';
			context.fill();

			// Keep the drawing in the drawing area
			context.save();
			context.beginPath();
			context.rect(drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
			context.clip();

			// For each point drawn
			for (i = 0; i < clickX.length; i += 1) {

				// Set the drawing radius
				switch (clickSize[i]) {
				case "small":
					radius = 2;
					break;
				case "normal":
					radius = 5;
					break;
				case "large":
					radius = 10;
					break;
				case "huge":
					radius = 20;
					break;
				default:
					break;
				}

				// Set the drawing path
				context.beginPath();
				// If dragging then draw a line between the two points
				if (clickDrag[i] && i) {
					context.moveTo(clickX[i - 1], clickY[i - 1]);
				} else {
					// The x position is moved over one pixel so a circle even if not dragging
					context.moveTo(clickX[i] - 1, clickY[i]);
				}
				context.lineTo(clickX[i], clickY[i]);
				
				// Set the drawing color
				if (clickTool[i] === "eraser") {
					//context.globalCompositeOperation = "destination-out"; // To erase instead of draw over with white
					context.strokeStyle = 'white';
				} else {
					//context.globalCompositeOperation = "source-over";	// To erase instead of draw over with white
					context.strokeStyle = clickColor[i];
				}
				context.lineCap = "round";
				context.lineJoin = "round";
				context.lineWidth = radius;
				context.stroke();
			}
			context.closePath();
			//context.globalCompositeOperation = "source-over";// To erase instead of draw over with white
			context.restore();

			// Overlay a crayon texture (if the current tool is crayon)
			if (curTool === "crayon") {
				context.globalAlpha = 0.4; // No IE support
				context.drawImage(crayonTextureImage, 0, 0, canvasWidth, canvasHeight);
			}
			context.globalAlpha = 1; // No IE support

			// Draw the outline image
			context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
		},

		// Adds a point to the drawing array.
		// @param x
		// @param y
		// @param dragging
		addClick = function (x, y, dragging) {

			clickX.push(x);
			clickY.push(y);
			clickTool.push(curTool);
			clickColor.push(curColor);
			clickSize.push(curSize);
			clickDrag.push(dragging);
		},

		// Add mouse and touch event listeners to the canvas
		createUserEvents = function () {

			var press = function (e) {
				// Mouse down location
				var sizeHotspotStartX,
					mouseX = e.pageX - this.offsetLeft,
					mouseY = e.pageY - this.offsetTop;

				if (mouseX < drawingAreaX) { // Left of the drawing area
					if (mouseX > mediumStartX) {
						if (mouseY > mediumStartY && mouseY < mediumStartY + mediumImageHeight) {
							curColor = colorPurple;
						} else if (mouseY > mediumStartY + mediumImageHeight && mouseY < mediumStartY + mediumImageHeight * 2) {
							curColor = colorGreen;
						} else if (mouseY > mediumStartY + mediumImageHeight * 2 && mouseY < mediumStartY + mediumImageHeight * 3) {
							curColor = colorYellow;
						} else if (mouseY > mediumStartY + mediumImageHeight * 3 && mouseY < mediumStartY + mediumImageHeight * 4) {
							curColor = colorBrown;
						}
					}
				} else if (mouseX > drawingAreaX + drawingAreaWidth) { // Right of the drawing area

					if (mouseY > toolHotspotStartY) {
						if (mouseY > sizeHotspotStartY) {
							sizeHotspotStartX = drawingAreaX + drawingAreaWidth;
							if (mouseY < sizeHotspotStartY + sizeHotspotHeight && mouseX > sizeHotspotStartX) {
								if (mouseX < sizeHotspotStartX + sizeHotspotWidthObject.huge) {
									curSize = "huge";
								} else if (mouseX < sizeHotspotStartX + sizeHotspotWidthObject.large + sizeHotspotWidthObject.huge) {
									curSize = "large";
								} else if (mouseX < sizeHotspotStartX + sizeHotspotWidthObject.normal + sizeHotspotWidthObject.large + sizeHotspotWidthObject.huge) {
									curSize = "normal";
								} else if (mouseX < sizeHotspotStartX + sizeHotspotWidthObject.small + sizeHotspotWidthObject.normal + sizeHotspotWidthObject.large + sizeHotspotWidthObject.huge) {
									curSize = "small";
								}
							}
						} else {
							if (mouseY < toolHotspotStartY + toolHotspotHeight) {
								curTool = "crayon";
							} else if (mouseY < toolHotspotStartY + toolHotspotHeight * 2) {
								curTool = "marker";
							} else if (mouseY < toolHotspotStartY + toolHotspotHeight * 3) {
								curTool = "eraser";
							}
						}
					}
				}
				paint = true;
				addClick(mouseX, mouseY, false);
				redraw();
			},

				drag = function (e) {
					if (paint) {
						addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
						redraw();
					}
					// Prevent the whole page from dragging if on mobile
					e.preventDefault();
				},

				release = function () {
					paint = false;
					redraw();
				},

				cancel = function () {
					paint = false;
				};

			// Add mouse event listeners to canvas element
			canvas.addEventListener("mousedown", press, false);
			canvas.addEventListener("mousemove", drag, false);
			canvas.addEventListener("mouseup", release);
			canvas.addEventListener("mouseout", cancel, false);

			// Add touch event listeners to canvas element
			canvas.addEventListener("touchstart", press, false);
			canvas.addEventListener("touchmove", drag, false);
			canvas.addEventListener("touchend", release, false);
			canvas.addEventListener("touchcancel", cancel, false);
		},
		// Initialize the color crayons' values
		colorCrayonsInit = function(){
						
			for(var i=0;i<colorCrayonsX.length;i++){
				
				colorCrayons.push({
					"x" : colorCrayonsX[i],
					"y" : colorCrayonsY[i],
				"color" : colorCrayonsColor[i],
			 "selected" : false
					});
				
			}
			
		},
		clearColorCanvas = function(){
			
			colorCanvasContext.clearRect(0,0,colorCanvas.width,colorCanvas.height);
			
		},
		clearCrayonArea = function(){
			colorCanvasContext.clearRect((50/100*colorCanvasDividerOneX)+colorCanvasDividerOneX,100,(50/100*colorCanvasDividerOneX)+colorCanvasDividerOneX,200);
		},
		redrawColorCanvas = function(){
			
			
			colorCanvasContext.drawImage(crayonTextureImage,0,0,colorCanvasWidth,colorCanvasHeight);
			colorCanvasContext.drawImage(previous,50,150,previous.width,previous.height);
			colorCanvasContext.drawImage(next,400,150,next.width,next.height);
			
			colorCanvasContext.beginPath();
			colorCanvasContext.strokeStyle = "rgba(0,0,0,.4)";
			colorCanvasContext.lineWidth = 4;
			colorCanvasContext.moveTo(colorCanvasDividerOneX,0);
			colorCanvasContext.lineTo(colorCanvasDividerOneX,200);
			colorCanvasContext.moveTo(colorCanvasDividerTwoX,0);
			colorCanvasContext.lineTo(colorCanvasDividerTwoX,200);
			colorCanvasContext.closePath();
			colorCanvasContext.stroke();
			
			
			// Redraw brushes using the newly calculated coordinates
			drawColorCrayons();
		},
		drawColorCrayons = function(){
			
			var drawColorCrayon = function (x, y, color, selected) {

				colorCanvasContext.beginPath();
				colorCanvasContext.moveTo(x + 41, y + 11);
				colorCanvasContext.lineTo(x + 41, y + 35);
				colorCanvasContext.lineTo(x + 29, y + 35);
				colorCanvasContext.lineTo(x + 29, y + 33);
				colorCanvasContext.lineTo(x + 11, y + 27);
				colorCanvasContext.lineTo(x + 11, y + 19);
				colorCanvasContext.lineTo(x + 29, y + 13);
				colorCanvasContext.lineTo(x + 29, y + 11);
				colorCanvasContext.lineTo(x + 41, y + 11);
				colorCanvasContext.closePath();
				colorCanvasContext.fillStyle = color;
				colorCanvasContext.fill();

				if (selected) {
					colorCanvasContext.drawImage(crayonImage, 0, 0, 79, mediumImageHeight, x, y, 79, mediumImageHeight);
					
				} else {
					colorCanvasContext.drawImage(crayonImage, 0, 0, 59, mediumImageHeight, x, y, 59, mediumImageHeight);
				}
			};
			
			
			colorCrayons.forEach(function(colorCrayon){
				drawColorCrayon(colorCrayon.x,colorCrayon.y,colorCrayon.color,colorCrayon.selected);
			});
		},
		createColorCanvasUserEvents = function(){
			var isValidClick = false,
				alreadySelected;
			
			var crayonClicked = function(mouseX,mouseY){
				// Check which crayon was clicked, set it "selected" property to true, update the current color, and then clear the crayon area 
				for(var i=0;i<colorCrayons.length;i++){
					
					if((mouseY <= colorCrayons[i].y + 37 && mouseY >= colorCrayons[i].y + 7) && (mouseX < colorCrayons[i].x + 63 && mouseX > colorCrayons[i].x + 8)){
							isValidClick = true;
						
						colorCrayons[i].selected = true;
						curColor = colorCrayons[i].color;
						deselectCrayons(i);
						
					}
				}
				
				
			},
			deselectCrayons = function(selected){
				for(var i=0;i<colorCrayons.length;i++){
					if(i!=selected){
						colorCrayons[i].selected = false;
					}
				
				}
				
			},
			clicked = function(e){
				
				var mouseX = e.pageX - this.offsetLeft;
				var mouseY = e.pageY - this.offsetTop;
					
				
				// Determine which button was clicked
				if(((mouseX < 84 && mouseX > 47) && (mouseY > 145 && mouseY < 184 ))  ){
					 isValidClick = true;
					// Move the brushes up by 10 px
					for(var i=0;i<colorCrayons.length;i++){
						colorCrayons[i].y = parseInt(colorCrayons[i].y) - 10;
						
					}
				}else if((mouseX < 436 && mouseX > 397) && (mouseY > 144 && mouseY < 184)){
					 isValidClick = true;
					// Move the brushes down by 10 px
					for(var i=0;i<colorCrayons.length;i++){
						colorCrayons[i].y = parseInt(colorCrayons[i].y) + 10;
					}
				}
				
				// No button was clicked. Maybe the user clicked a crayon?
			       crayonClicked(mouseX,mouseY);
			     
			     if(isValidClick){
			    	  clearColorCanvas();
					  redrawColorCanvas();
			     }
			     
			     e.preventDefault();
				
			};
			colorCanvas.addEventListener("mousedown",clicked,true);
			colorCanvas.addEventListener("touchstart",clicked,true);
		},
		// Calls the redraw function after all necessary resources are loaded.
		resourceLoaded = function () {

			curLoadResNum += 1;
			if (curLoadResNum === totalLoadResources) {
				redraw();
				createUserEvents();
				redrawColorCanvas();
				createColorCanvasUserEvents();
			}
		},
		hide_notification_message = function(){
			// Waits for approximately 2 seconds, and then hides the messages
			setTimeout(function(){
				$("#notification_message").fadeOut();
			},2000);
		},
		// Loads an image to color.
		// @param image_name
		loadBackgroundImage = function(image_name){
			
			outlineImage.onload = resourceLoaded;
			outlineImage.src = "static/images/background/"+image_name;
			
		},
		// Returns an image to color
		getBackgroundImage = function(){
			// this function will emit a message to get the current randomly chose image for all connected users 
			return "watermelon-duck-outline.png";
		},
		
		// Saves the drawing locally as an image 
		// @param image_name
		// @param image_data
		saveDrawingToLocal = function(image_name,image_data,album_id){
		    
			var canSave = true;
			var $notification_message = $("#notification_message");
			
			restoreDrawingsFromLocal().forEach(function(drawing){
				// Check to see if there is already a drawing by the user-entered name
				if(drawing.image_name==image_name && drawing.album_id == album_id){
		    	      canSave = false;
				}
				
			});
			
			if(canSave){
				// Check if there is any drawings already in storage, if there is increment the number and store or store the first one 
					if(localStorage["drawing_number"]!=null){
						var drawing_no = parseInt(localStorage["drawing_number"]);
						localStorage["drawing_number"] = ++drawing_no;
						localStorage["drawing_"+localStorage["drawing_number"]] = JSON.stringify({"album_id" : album_id, "image_name" : image_name,"image_data" : image_data});
						$notification_message.html("Drawing saved.").css("color","teal").fadeIn();
			    	    hide_notification_message();
						clearDrawing();
					}else{
						localStorage["drawing_number"] = 1;
						localStorage["drawing_"+localStorage["drawing_number"]] = JSON.stringify({"album_id" : album_id,"image_name" : image_name,"image_data" : image_data});
						$notification_message.html("Drawing saved.").css("color","teal").fadeIn();
			    	    hide_notification_message();
			    	    clearDrawing();
					}
			}else{
				
				$notification_message.html("The name already exists. Please choose a unique name.").css("color","red").fadeIn();
	    	    hide_notification_message();
			}
			
		 },
		 // Returns the user's saved drawings
		 restoreDrawingsFromLocal = function(){
			 
			   var drawings = Array();
			   if(localStorage["drawing_number"]!=null){
				   	var number_of_drawings = parseInt(localStorage["drawing_number"]);
				   		for(var i=1;i<=number_of_drawings;i++){
				   				drawings.push(JSON.parse(localStorage["drawing_"+i])); 
				   			}
			   }
			 
			 return drawings;
		 },
		 // Deletes a drawing from storage
		 // @param image_name
		 deleteStoredDrawing = function(image_name,album_id){
			 			
			 var index = 0;
			 restoreDrawingsFromLocal().forEach(function(drawing){
				 if(drawing.image_name != image_name && drawing.album_id != album_id){
					 index++;
					 localStorage["drawing_"+index] = JSON.stringify(drawing);
				 }
			 });
			 localStorage["drawing_number"] = index;
			 populateSavedDrawings();
		 },
		 // Deletes album files
		// @param album_id
		 deleteAlbumFiles = function(album_id){
			 var index = 0;
			 restoreDrawingsFromLocal().forEach(function(drawing){
				 if(drawing.album_id != album_id){
					 index++;
					 localStorage["drawing_"+index] = JSON.stringify(drawing);
				 }
			 });
			 localStorage["drawing_number"] = index;
			 populateSavedDrawings();
			 
		 },
		 // Deletes an album
		 // @param album_id
		 deleteAlbum = function(album_id){
			 var albums = JSON.parse(localStorage['albums']);
			 albums = $.grep(albums,function(album,i){
				      return (album.album_id != album_id);
			 		});
			 localStorage['albums'] = JSON.stringify(albums);
		 },
		 // Populates the saved drawings from storage to the collection page
		 // @param album_id
		 populateSavedDrawings = function(album_id){
			 
			 var $drawingsDiv = $("#drawingsDiv");
				$drawingsDiv.html("");
				var drawings = "";
				restoreDrawingsFromLocal().forEach(function(drawing){
					if(drawing.album_id==album_id){
						$drawingsDiv.append("<a href='#' id='"+drawing.image_name+"' data-role='button'><img src='"+drawing.image_data+"'  /><br />Name: "+drawing.image_name+"</a><br />");
						// deletes the clicked or tapped image
						$("#"+drawing.image_name).on("vclick",function(e){
								deleteStoredDrawing(drawing.image_name,drawing.album_id);
							e.preventDefault();
						});
					}
				});
			 
		 },
		 // Populates album folders on the collection page
		 populateAlbumFolders = function(){
			 var folderImage = new Image();
			   	 folderImage.src = "static/images/folder.gif";
			   	 folderImage.onload = function(){
			   		$("#foldersDiv").html("");
			   		JSON.parse(localStorage['albums']).forEach(function(album){
			   			$("#foldersDiv").append(" <div><a href='#' data-role='button' id='delete_"+album.album_id+"' title='delete'><img src='static/images/delete.png' alt='delete' /></a> <a href='#' data-role='button'  id='"+album.album_id+"' class='folder'><img src='"+folderImage.src+"' alt='folder' class='folder' /></a> <div> "+album.album_name+"</div><a href='#' data-role='button' id='enter_comp_"+album.album_id+"' title='enter collection tournament'><img src='static/images/enter_competition.png' alt='enter collection tournament' /></a></div>");
			   			  // locally store the clicked folder's album id and forward the user to the savedImages page 
			   				$("#"+album.album_id).on("vclick",function(e){
			   				  sessionStorage['clickedFolder'] = album.album_id;
			   				  $.mobile.changePage("#savedImages");
			   				  e.preventDefault();
			   			  });
			   				
			   			 $("#delete_"+album.album_id).on("vclick",function(){
			   				 // deletes an album if its not the default one
			   				 if(album.album_id != "album_1"){
			   					 deleteAlbum(album.album_id);
			   					 deleteAlbumFiles(album.album_id);
			   					 populateAlbumFolders();
			   					 populateAlbums();
			   				 }
			   			 });	
			   		});
			   		
			   } 
		 },
		 populateAlbums = function(){
			 $("#albums_selection").html(cleanAlbumsDropDown);
			 var albums_selection="";
			 JSON.parse(localStorage['albums']).forEach(function(album){
				 // populate album drop-down
				 albums_selection += "<option value='"+album.album_id+"'> "+album.album_name+" </option>";
			 });
			 $("#albums_selection").append(albums_selection);
			 
		 },
		 albumsInit = function(){
			 
			 try{
				 populateAlbums();
				 
			 }catch(ex){
				 // if the albums storage doesn't exists, create a new default album, and then store it in a new created albums storage
				 var albumObj = {"album_id" : "album_1", "album_name" : "Default"},
				 albums = new Array();
				 albums.push(albumObj);
				 localStorage['albums'] = JSON.stringify(albums);
				 populateAlbums();
			 }
			 
		 },
		 // Check if an album name exists
		 // @param album_name
		 albumNameExists = function(album_name){
			 var isExists = false;
				 JSON.parse(localStorage['albums']).forEach(function(album){
					 if(album.album_name==album_name){
						 isExists = true;
					 }
				 
				 });
			 
			 return isExists;
		 },
		 // Creates a new album for saving drawings
		 // @param album_name
		 createAlbum = function(album_name){
			 var isCreated = false;
			 
			 if(!albumNameExists(album_name)){
				 
				 // generate album id
				 var albums = JSON.parse(localStorage['albums']),
				 	 last_album_id = albums[albums.length-1].album_id,
				 	 underscore_index = last_album_id.indexOf('_'),
				 	 id_no = parseInt(last_album_id.substr(underscore_index+1));
				 	 id_no++;
				 var album_id = "album_"+id_no,
				 	 albumObj = {"album_id" : album_id, "album_name" : album_name};
				 
				    
				 	albums.push(albumObj);
				 	localStorage['albums'] = JSON.stringify(albums);
				 
				 isCreated = true;
			 }
			 
			 return isCreated;
		 },
		 login = function(login_details){
			 
			 
			 var username = login_details.username,
			 password = login_details.password;
			 
			 console.log("in login"+username +" "+password);
			 
			 var displayLoginError = function(){
				 
				 console.log("login error");
				 $("#username").val("");
				 $("#password").val("");
				 $("#message").val("Incorrect username or password");
				 
			 }
			 
			  var validate_login = function(username,password){
				  
				  var isValid = true;
				  
				  var validate_username = /^[a-z]([0-9a-z_])+$/i;
					if( (validate_username.test(username))==false){
						console.log(username)
						displayLoginError();
						isValid = false;
				
						}
					
					var validate_password = /^[a-z]([0-9a-z_])+$/i;
					if( (validate_password.test(password))==false){
						console.log(password);
						displayLoginError();
						isValid = false;
						}
					
				  return isValid;
			  }
			  
			  if(validate_login(username,password)){
				  var isRegistered = false;
				  // validate user details from our database
				  socket.emit("login",JSON.stringify({"username" : username , "password" : password}));
				  
				  return isRegistered;
			  }else{
				  
				  console.log("Invalid login details");
			  }
			 
		 },
		 register = function(details){
			 
			 console.log("In register");
			 
			var disaplyRegisterError = function(){
				
				console.log("Register Error");
				
			} 
			 
			var validateRegister = function(details){
				   
				  var isValid = true;
				   
				   var validate_username = /^[a-z]([0-9a-z_])+$/i;
					if( (!validate_username.test(username))){
						displayRegisterError();
						isValid = false;
				
						}
					
			if(details.password == details.password_2){
						
				var passwords = [details.password,details.password_2];
					
				for(var i=0,len = passwords.length;i<len;i++){
					
					var validate_password = /^[a-z]([0-9a-z_])+$/i;
					if( (!validate_password.test(passwords[i]))){
						displayRegisterError();
						isValid = false;
						}
				   }
				
				}
					
				   
				   return isValid;
			   }
			   if(validateRegister(details)){
				   var isRegistered = false;
					  // register user details to our database
					  
				  return isRegistered;
			   }
		 },
		// Creates a canvas element, loads images, adds events, and draws the canvas for the first time.
		init = function () {

			// Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
			canvas = document.createElement('canvas');
			canvas.setAttribute('width', canvasWidth);
			canvas.setAttribute('height', canvasHeight);
			canvas.setAttribute('id', 'canvas');
			document.getElementById('canvasDiv').appendChild(canvas);
			
			colorCanvas = document.createElement('canvas');
			colorCanvas.setAttribute('width',colorCanvasWidth);
			colorCanvas.setAttribute('height',colorCanvasHeight);
			colorCanvas.setAttribute('id',"colorCanvas");
			document.getElementById('canvasDiv').appendChild(colorCanvas);
			
			
			if (typeof G_vmlCanvasManager !== "undefined") {
				canvas = G_vmlCanvasManager.initElement(canvas);
				colorCanvas = G_vmlCanvasManager.initElement(colorCanvas);
			}
			context = canvas.getContext("2d"); // Grab the 2d canvas context
			colorCanvasContext = colorCanvas.getContext("2d"); // Grabs the 2d canvas context of the colorCanvas
			// Note: The above code is a workaround for IE 8 and lower. Otherwise we could have used:
			//     context = document.getElementById('canvas').getContext("2d");
			
			// initialize additional crayons' coordinates, and colors
			colorCrayonsInit();
			
			// saves the state of the albums drop down
			cleanAlbumsDropDown = $("#albums_selection").html();

			// initialize albums
			 albumsInit();
			

			// Load images
			crayonImage.onload = resourceLoaded;
			crayonImage.src = "static/images/crayon-outline.png";

			markerImage.onload = resourceLoaded;
			markerImage.src = "static/images/marker-outline.png";

			eraserImage.onload = resourceLoaded;
			eraserImage.src = "static/images/eraser-outline.png";

			crayonBackgroundImage.onload = resourceLoaded;
			crayonBackgroundImage.src = "static/images/crayon-background.png";

			markerBackgroundImage.onload = resourceLoaded;
			markerBackgroundImage.src = "static/images/marker-background.png";

			eraserBackgroundImage.onload = resourceLoaded;
			eraserBackgroundImage.src = "static/images/eraser-background.png";

			crayonTextureImage.onload = resourceLoaded;
			crayonTextureImage.src = "static/images/crayon-texture.png";
			
			previous.onload = resourceLoaded;
			previous.src = "static/images/previous.gif";
			
			next.onload = resourceLoaded;
			next.src = "static/images/next.gif";

			loadBackgroundImage(getBackgroundImage());
			
		};

	return {
		init : init,
		saveDrawingToLocal : saveDrawingToLocal,
		restoreDrawingsFromLocal : restoreDrawingsFromLocal,
		hide_notification_message : hide_notification_message,
		populateSavedDrawings : populateSavedDrawings,
		createAlbum : createAlbum,
		populateAlbumFolders : populateAlbumFolders,
		populateAlbums : populateAlbums,
		login : login,
		register : register
	};
}(socket));