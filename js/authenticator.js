var authenticate_da = require(__dirname+"/data_access/authenticator_da");

var authenticate = function(client,mysql_con,fs){
	
	
	client.on("login",function(objAuth){
		
		console.log("about to login");
		objAuth = JSON.parse(objAuth);
		authenticate_da.Login(client,mysql_con,fs,objAuth);
		
	});
	
	
};


exports.authenticate = authenticate;