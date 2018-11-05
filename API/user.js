var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
module.exports = function(app, mongo, console_log) {
	
	var Schema = mongo.Schema;
	var UserSchema = new Schema({
		_id: { type: String },
		login: { 
			type: String,
			required: true,
			trim: true,
			unique: true
		},
		password: { 
			type: String,
			required: true
		},
		actif: { 
			type: Boolean,
			default: false
		}
	},{ versionKey: false });	
	UserSchema.methods.comparePassword = function(mdp, cb){
		bcrypt.compare(mdp, this.password, function (err, isMatch) {
			if (err) {
				return cb(err);
			}
			cb(null, isMatch);
		});
	}
	var userModel = mongo.model('users', UserSchema);
	
	/** Ajout d'un nouvel utilisateur */
	app.post('/user/register', function(req, res) {
		var newUser = new userModel(req.body);
		newUser._id = new mongo.mongo.ObjectId();
		newUser.password = bcrypt.hashSync(req.body.password, 10);
		newUser.save(function(err, user){
			if(err){
				console_log('[ERROR] CREATE user :' + err);
				res.status(401).send({success: false, msg: "La création de l'utilisateur " + newUser.login + " a échoué"});
			} else {
				console_log('[SUCCESS] CREATE user :' + JSON.stringify(user));
				user.password = "";
				res.json(user);
			}
			
		})
		
	});
	
	/** Authentification */
	app.post('/user/login', function(req, res) {
		userModel.findOne({
			login: req.body.login
		}, function(err, user) {
			if (err) {
				console_log('[ERROR] GET user : ' + err);
			}else {
				if (!user) {
					res.status(200).send({success: false, msg: "L'authentification a échouée. Utilisateur non trouvé."});
				} else {
					// check if password matches
					user.comparePassword(req.body.password, function (err, isMatch) {
						if (isMatch && !err) {
							if (!user.actif){
								console_log("[ERROR] GET user : l'utilisateur" + user.login +" n'est pas actif");
								res.status(200).send({success: false, msg: "L'utilisateur n'est pas actif"});
							} else {
								// if user is found and password is right create a token
								var token = jwt.sign(user.toJSON(), 'nodeauthsecret', { expiresIn: 604800 }); // 1 week
								// return the information including token as JSON
								//res.json({success: true, token: 'JWT ' + token});
								console_log('[SUCCESS] GET user : ' + user);
								user.password = "";
								res.cookie("SESSIONID", token, {httpOnly:true, secure:true});
								res.json({success: true, user: user, idToken: token, expiresIn: 604800});
							}
						} else {
							console_log('[ERROR] GET user : ' + err);
							res.status(200).send({success: false, msg: "L'authentification a échouée. Mauvais mot de passe."});
						}
					});
				}
			}
		});
	});
}