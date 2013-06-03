var chat_da = require(__dirname+"/data_access/chat_da");

var chat = function(client,mysql_con,fs){
	
	
	client.on("chat_message",function(chat_message){
		
		client.get("username",function(error,username){
			
			if(error)
				throw error;
			
			console.log("about to emit chat message from "+username);
			var objChatMessage = {
					"from": username,
					"message" : chat_message
				};
			
			console.log(objChatMessage);
			client.broadcast.emit("chat_message",JSON.stringify(objChatMessage));
			//chat_da.storeChatMessage(client,mysql_con,fs,objChatMessage);
		});	
	});
	
	client.on("send_image",function(objImageData){
		
		client.get("username",function(error,username){
			if(error)
				throw error;
			
			console.log("about to emit chat image from "+username);
			objImageData = JSON.parse(objImageData);
			var objChatImage = {
					"from": username,
					"imageData" : objImageData
				};
			
			console.log(objChatImage);
			client.broadcast.emit("chat_image",JSON.stringify(objChatImage));
			//chat_da.storeChatImage(client,mysql_con,fs,objChatMessage);
			
			
		});
	});
		
};


exports.chat = chat;