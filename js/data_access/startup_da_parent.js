var fs = require("fs");
var i = 0;
var connection = function(){
	
	try{
	var mysql_con = mysql.createConnection({
		host : "localhost",
		user : "root",
		password : "",
		database : "printp"
			
	});
	console.log("connection: "+(i++));
	return mysql_con;
	
	}catch(err){
		logDatabaseSystemError(err);
	}
};

var runQuery = function(queryText,mysql_con,client,error_callback,success_callback){
	
	 mysql_con.query(queryText,function(error){
		 if(error){
			 error_callback(client,error);
		 }else{
			 
			 success_callback(client);
		 }
   	 
    });
	 
	
	
};

var runSelectQuery = function(query,client,mysql_con,error_callback,success_callback){
	
	 mysql_con.query(query,function(error,rows,fields){
		 if(error){
			 error_callback(client,error);
			
		 }else{
   	 
			 success_callback(client,rows,fields);
   	 
		 }
    });
	
	
};

var logDatabaseSystemError = function(client,error,file_name,line_number){
	
	var system_error = {
			"error" : error,
			"file_name" : file_name,
			"line_number" : line_number
		};
	
	fs.appendFile(__dirname+"/log_files/database_system_errors.json",JSON.stringify(system_error).concat('\n'),'utf8',function(err){
		if(err){
			console.trace(err);
			// if we can't read both files email the error to Admin for immediate attention.
			
		}else{
			
			require(__dirname+"/system_errors_da").getDatabaseSystemErrors(client,true);
		}
	});
	
	
	
};

var logFileSystemError = function(client,error,file_name,line_number){
	
	var system_error = {
			"error" : error,
			"file_name" : file_name,
			"line_number" : line_number
		};

	fs.appendFile('./js/data_access/log_files/file_system_errors.json',JSON.stringify(system_error).concat('\n'),'utf8',function(err){
		if(err){
			console.trace(err);
			// if we can't read both files email the error to Admin for immediate attention.
			
		}else{
			
			require(__dirname+"/system_errors_da").getFileSystemErrors(client,true);
		}
	});
	
	
};

var logSystemError = function(client,error,file_name,line_number){
	
	var system_error = {
			"error" : error,
			"file_name" : file_name,
			"line_number" : line_number
		};

	fs.appendFile('./js/data_access/log_files/system_errors.json',JSON.stringify(system_error).concat('\n'),'utf8',function(err){
		if(err){
			console.trace(err);
			// if we can't read both files email the error to Admin for immediate attention.
			
		}else{
			
			require(__dirname+"/system_errors_da").getSystemErrors(client,true);
		}
	});
	
	
};

	//exports.connection = connection;
	exports.runQuery = runQuery;
	exports.runSelectQuery = runSelectQuery;
	exports.logDatabaseSystemError = logDatabaseSystemError;
	exports.logFileSystemError = logFileSystemError;
	exports.logSystemError = logSystemError;
	
