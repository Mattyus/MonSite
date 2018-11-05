var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var mongo = require("mongoose");
var app = express();

/** LOG */
function console_log ( message ){
	console.log(new Date() + ' => ' + message);
}

/** BDD **/
var db = mongo.connect("mongodb://localhost:27017/monSite", function(err, db){  
	if(err) { 
		console_log('[ERROR] : ' + err); 
	} else { 
		console_log('[SUCCESS] Connected to BDD monSite');
	}
});

/** API **/
var app = express();
app.use(bodyParser());
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended:true}));

app.use(function(req, res, next) { //allow cross origin requests
	res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
	res.setHeader('Access-Control-Allow-Headers', "X-Requested-With,content-type");
	res.setHeader("Access-Control-Allow-Credentials", true);
	next();
});

app.listen(8080, function () {
	console_log('App listening on port 8080!')  
}) 

/** USER */
var user = require("./user.js")(app, mongo, console_log);

/** FILE */
var file = require("./file.js")(app, console_log);

/** PHOTO */
var photo = require("./photo.js")(app, mongo, console_log);

/** PHOTO */
var album = require("./album.js")(app, mongo, console_log);

