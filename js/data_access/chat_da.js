var startup_da_parent  = require(__dirname+"/startup_da_parent");


var storeChatMessage = function(client,mysql_con,fs,objChatMessage){
	
	try{
	
	    var query = "INSERT INTO ChatMessages(from,chat_message) VALUES('"+objChatMessage.from+"','"+objChatMessage.chat_message+"')";
	    startup_da_parent.runQuery(query,client,mysql_con,function(client,error){
	    	
	    	console.trace(error);
	    	client.emit("store_chat_error");
	    	var file_name = "chat_da.js",
			line_number = 10;
			startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
	    	
	    },function(client){
	    	
	   
	    	
	    });
	    
	}catch(error){
		// System error logging
		console.log(error);
		var file_name = "chat_da.js",
		line_number = 5;
		startup_da_parent.logSystemError(client,error,file_name,line_number);
	}
	    
};

exports.storeChatMessage = storeChatMessage;