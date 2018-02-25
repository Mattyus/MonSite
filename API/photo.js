module.exports = function(app, mongo, console_log) {
	
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

	/** API chemin pour avoir les photos d'un album */
	app.get('/api/photo/:album', function(req, res) {
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
	app.delete('/api/photo/:id', function(req,res){
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
}