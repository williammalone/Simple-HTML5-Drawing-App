

var DrawingAppDa = (function(){
	
	var db,
	    db_name = "DrawingApp",
	    db_descr = "Drawing App Manager",
	    db_version = "1.0",
	    db_size = 5 * 1024 * 1024,
	    
	    openDB = function(){
		
		db = openDatabase(db_name,db_descr,db_version,db_size);
		
		},
	    createImagesTable = function(){
			
		  db.transaction(function(tx){
			  
			  tx.executeSql("CREATE TABLE ChatImages (timestape PRIMARY KEY TEXT NOT NULL, file_name TEXT NOT NULL, file_format TEXT NOT NULL,image_data TEXT NOT NULL,from TEXT NOT NULL)",[],function(tx,result){
				  
				  console.log("Table ChatImages created");
				  
			  },function(tx,e){
				  
				  console.log("Error: "+e);
			  });
			  
		  });
			
		},
		addImage = function(objImageData,from){
			
			db.transaction(function(tx){
				
				tx.executeSql("INSERT INTO ChatImages(timestape,file_name,file_format,image_data,from) VALUES(?,?,?,?,from)",[objImageData.timestape,objImageData.file_name,objImageData.file_format,objImageData.image_data,from],function(tx,result){
					
					console.log("Image added");
				},function(tx,e){
					
					console.log("Could not add image");
				});
			});
			
		},
		getImageByTimestape = function(timestape){
			
			db.transaction(function(tx){
				tx.executeSql("SELECT * FROM ChatImages WHERE timestape = ?",[timestape],function(tx,result){
					
					if(result){
						console.log(result.rows.item(0));
						
						$("#chat_content").trigger({
							"type" : "chatImage",
					   "chatImage" : result.rows.item(0)
						});
					}
					
				},function(tx,e){
					
					console.log("Could not get image");
					
				});
			});
			
		},
		deleteImage = function(timestape){
			
			db.transaction(function(tx){
				tx.executeSql("DELETE FROM ChatImages WHERE timestape = ?",[timestape],function(tx,result){
					
					console.log("Image deleted");
					
				},function(tx,e){
					
					console.log("Error: Could not delete image "+e);
					
				});
			});
			
		},
		deleteAllImages = function(){
			
			db.transaction(function(tx){
				tx.executeSql("DELETE FROM ChatImages",[],function(tx,result){
					
					console.log("All chat messages deleted");
					
				},function(tx,e){
					
					console.log("could not delete chat messages");
					
				});
			});
			
		},
		getAllImages = function(){
			
			db.transaction(function(tx){
				tx.executeSql("SELECT * FROM ChatImages",function(tx,result){
					
					var Images = [];
					for(var i=0,len = result.rows.length;i++){
						Images.push(result.rows.item(i));
					}
					
					$("#chat_content").trigger({
						type : "allImages",
						Images : Images
					});
					
				},function(tx,e){
					console.log("Error: Could not get images");
				});
			});
			
		},
		init = function(){
			
			openDB();
			if(!localStorage['drawingApp_tables_created']){
				createImagesTable();
				localStorage["drawingApp_tables_created"] = "true";
			}
			
			
		};
	
	
	return {
		
		init : init
	};
})();