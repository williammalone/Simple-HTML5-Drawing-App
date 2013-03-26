#!/bin/env node
//  OpenShift Node application

var express = require('express');
var app = express();

var server = require('http').createServer(app);

var io = require('socket.io/lib/socket.io');
io = io.listen(server);

var mysql = require('mysql');

//Get the environment variables we need.
var ipaddr  = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port    = process.env.OPENSHIFT_NODEJS_PORT || 8000;


app.use(express.static(__dirname+"/public"));
app.enable("trust proxy");
app.listen(port, ipaddr);

app.get("/",function(req,res){
	console.log("connecting...");
	res.writeHead(200,"Content: text/html");
	res.write("./public/index.html");
	
	
});

io.sockets.on("connection",function(socket){
	console.log("client connected");
	socket.emit("connected","You have been connected");
});


console.log("Server running on port "+port);
