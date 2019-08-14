var startup_da_parent  = require(__dirname+"/startup_da_parent");


var Login = function(client,mysql_con,fs,userDetails){
	
	try{
	
	    var query = "SELECT username FROM Players WHERE username = '"+userDetails.username+"' AND password = '"+userDetails.password+"'";
	    startup_da_parent.runSelectQuery(query,client,mysql_con,function(client,error){
	    	
	    	console.trace(error);
	    	client.emit("login_error");
	    	var file_name = "authenticator_da.js",
			line_number = 10;
			startup_da_parent.logDatabaseSystemError(client,error,file_name,line_number);
	    	
	    },function(client,rows,fields){
	    	
	    	if(rows.length){
	    		
	    		client.set("username",rows[0].username);
	    		client.set("presence","online");
	    	if(userDetails.status)
	    		client.set("status",userDetails.status);
	    			else
	    				client.set("status","Online");
	    		
	    		client.emit("login_success");
	    	}else{
	    		
	    		client.emit("incorrect_login");
	    	}
	    	
	    });
	    
	}catch(error){
		// System error logging
		console.log(error);
		var file_name = "authenticator_da.js",
		line_number = 5;
		startup_da_parent.logSystemError(client,error,file_name,line_number);
	}
	    
};

exports.Login = Login;