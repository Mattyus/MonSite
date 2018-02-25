var multer = require('multer');
var fs = require('fs');
module.exports = function(app, console_log) {
	
	const repertoire = 'E:/Photo/';

	//multers disk storage settings
	var storage = multer.diskStorage({ 
		destination: function (req, file, cb) {
			cb(null, repertoire);
		},
		filename: function (req, file, cb) {
			var datetimestamp = Date.now();
			cb(null, file.originalname);
		}
	});

	//multer settings
	var upload = multer({ 
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
		var file = repertoire + req.params.nom;
		res.download(file);
	});
	
	app.delete('/delete/:nom', function(req, res){
		var file = repertoire + req.params.nom;
		fs.unlink(file, function(err, data) {
			if(err){
				res.send(err);
				console_log('[ERROR] DELETE FILE : ' + err);
			} else {
				res.send(data);
				console_log('[SUCCESS] DELETE FILE : ' + req.params.nom);
			}
		});
	})
}