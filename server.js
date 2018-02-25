var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var mongo = require("mongoose");
var app = express();
var multer = require('multer');

/** BDD **/
var db = mongo.connect("mongodb://localhost:27017/monSite", function(err, db){  
	if(err) { 
		console_log('[ERROR] : ' + err); 
	} else { 
		console_log('[SUCCESS] Connected to BDD monSite');
	}
});

var Schema = mongo.Schema;

var PhotoSchema = new Schema({
	_id: { type: String },
	album: { type: String },
	titre: { type: String },
	nom: { type: String },
	tags: [{ display: {type: String}, value: {type: String} }],
	date: { type: Date },
	utilisateur: { type: String }
},{ versionKey: false });
var photoModel = mongo.model('photos', PhotoSchema);

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


var storage = multer.diskStorage({ //multers disk storage settings
	destination: function (req, file, cb) {
		cb(null, 'E:/Photo/');
	},
	filename: function (req, file, cb) {
		var datetimestamp = Date.now();
		cb(null, file.originalname);
	}
});

var upload = multer({ //multer settings
	storage: storage
}).single('file');

/** API chemin pour upload les fichiers */
app.post('/upload', function(req, res) {
	upload(req,res,function(err){
		if(err){
			res.send(err);
			console_log('[ERROR] UPLOAD : ' + err);
		} else {
			res.send(req.file.filename);
			console_log('[SUCCESS] UPLOAD : ' + req.file.filename);
		}
	});
});

/** API chemin pour download les fichiers */
app.get('/download/:nom', function(req, res){
	var file = 'E:/Photo/' + req.params.nom;
	res.download(file);
});

/** API chemin pour avoir les photos d'un album */
app.get('/api/photo/:album', function(req, res) {
	console.log('GET album : ' + req.params.album +' le '+ new Date());
	photoModel.find({ album: req.params.album }, function(err, data) {
		if(err){    
			res.send(err);
			console_log('[ERROR] GET album : ' + err);
		}
		else{
			res.json(data);
			console_log('[SUCCESS] GET album : ' + req.params.album);
		}
	});
});

/** API chemin pour rajouter une photo */
app.post('/api/photo', function(req, res) {
	var photo = new photoModel(req.body);
	photo._id = new mongo.mongo.ObjectId();
	photo.save(function(err,data){
		if(err){  
			res.send(err);
			console_log('[ERROR] POST photo : ' + err);
		}  
		else{
			res.json(data);
			console_log('[SUCCESS] POST photo : ' + JSON.stringify(data));
		}
	});
});

/** API chemin pour supprimer une photo */
app.del('/api/photo/:id', function(req,res){
	photoModel.remove({_id: req.params.id}, function(err,data){
		if (err){
			res.send(err);
			console_log('[ERROR] DELETE photo : ' + err);
		}
		else{
			res.json(data);
			console_log('[SUCCESS] DELETE photo : ' + JSON.stringify(data));
		}
	});
});

/** API chemin pour modifier une photo */
app.put('/api/photo/:id', function(req,res){
	photoModel.findOneAndUpdate({_id:req.params.id}, req.body, function(err,data){
		if(err){
			res.send(err);
			console_log('[ERROR] PUT photo : ' + err);
		}  
		else{
			res.json(data);
			console_log('[SUCCESS] PUT photo : ' + JSON.stringify(data));
		}
	});
});

function console_log ( message ){
	console.log(new Date() + ' => ' + message);
}