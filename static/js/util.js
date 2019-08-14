	

	(function(){
		
		// FileList
		 FileList.prototype.toArray = function(){
				
				var files = [];
				for(var i=0,len = this.length; i < len; i++){
					 files.push(this[i]);
				}
				
				return files;
			};
			
	})();

	
	
	(function(){
		
		// File 
		File.prototype.getName = function(successCB,errorCB){
			try{
			   
			   successCB(this.name.substr(0,this.name.indexOf('.')));
			   
			  }catch(e){
			   
				if(arguments[1])
					errorCB(e);
					else
					  throw e;
				   
			}
		};
		
		File.prototype.getType = function(successCB,errorCB){
			try{
			 
			   successCB(this.type.substr(0,this.type.indexOf('/')));
			   
			  }catch(e){
			   
				   if(arguments[1])
					errorCB(e);
					else
					  throw e;
				   
			}	
		};
		
		File.prototype.getFormat = function(successCB,errorCB){
			try{
			 
			   successCB(this.type.substr(this.type.indexOf('/')+1));
			   
			  }catch(e){
			   
				   if(arguments[1])
					errorCB(e);
					else
					  throw e;
				   
			}	
		};
		
		File.prototype.readDataURL = function(successCB,errorCB){
			try{
				
			var reader = new FileReader();
			reader.onloadend = function(){
				successCB(this.result);
			};
			
			reader.onerror = function(e){
				throw e;
			};
			
			reader.readAsDataURL(this);
		
			}catch(e){
			 
				if(arguments[1])
					errorCB(e);
					else
					  throw e;
			}
		};
		
	File.prototype.readBinary = function(successCB,errorCB){
			
			try{
			var reader = new FileReader();
			
			reader.onloadend = function(){
				successCB(this.result);
			};
			
			reader.onerror = function(e){
				throw e;
			};
			// Have to change this to call a method that reads data as a binary
			reader.readAsDataURL(this);
			
			}catch(e){
			 
				if(arguments[1])
					errorCB(e);
					else
					  throw e;
			}
		};
		
	})();
	
	(function(){
		
		// String
		String.prototype.splitWhere = function(separator,successCB,errorCB){
			
			try{
				
				if(this.indexOf(separator)!=-1){
					firstP = this.substr(0,this.indexOf(separator)).trim();
					lastP = this.substr(this.indexOf(separator)).trim();
					successCB([firstP,lastP]);
					
				}else{
					
					successCB(this);
				}
				
			}catch(e){
				
				if(arguments[2])
					errorCB(e);
					else
						throw e;
			}
		};
		
	})();
	 