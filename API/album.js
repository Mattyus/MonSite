module.exports = function(app, mongo, console_log) {
	
	var Schema = mongo.Schema;
	var AlbumSchema = new Schema({
		_id: { type: String },
		titre: { type: String },
		photo: { type: String },
		description: { type: String }
	},{ versionKey: false });
	var albumModel = mongo.model('albums', AlbumSchema);
			
	/** API chemin pour avoir les albums */
	app.get('/api/album', function(req, res) {
		albumModel.find( function(err, data) {
			if(err){    
				res.send(err);
				console_log('[ERROR] GET album : ' + err);
			}
			else{
				res.json(data);
				console_log('[SUCCESS] GET all album');
			}
		});
	});
	
	/** API chemin pour rajouter un album */
	app.post('/api/album', function(req, res) {
		var album = new albumModel(req.body);
		album._id = new mongo.mongo.ObjectId();
		album.save(function(err,data){
			if(err){  
				res.send(err);
				console_log('[ERROR] POST album : ' + err);
			}  
			else{
				res.json(data);
				console_log('[SUCCESS] POST album : ' + JSON.stringify(data));
			}
		});
	});
	
	/** API chemin pour supprimer un album */
	app.delete('/api/album/:id', function(req,res){
		albumModel.remove({_id: req.params.id}, function(err,data){
			if (err){
				res.send(err);
				console_log('[ERROR] DELETE album : ' + err);
			}
			else{
				res.json(data);
				console_log('[SUCCESS] DELETE album : ' + JSON.stringify(data));
			}
		});
	});
	
	/** API chemin pour modifier un album */
	app.put('/api/album/:id', function(req,res){
		albumModel.findOneAndUpdate({_id:req.params.id}, req.body, function(err,data){
			if(err){
				res.send(err);
				console_log('[ERROR] PUT album : ' + err);
			}  
			else{
				res.json(data);
				console_log('[SUCCESS] PUT album : ' + JSON.stringify(data));
			}
		});
	});
}