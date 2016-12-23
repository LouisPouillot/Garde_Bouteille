var express = require('express');
var session = require('express-session');
var router = express.Router();
require('../models/users_model');
var dynamoose = require('dynamoose');
var Users = dynamoose.model('Users');


//AWS.config.loadFromPath('./config.json');

var session;

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('connexion');
});

router.post('/', function(req, res, next) {

	session = req.session;
	User.get({Pseudo: req.body.login}).then(function (user) {
		if (req.body.password == user.Password) {
			console.log("Connecté : " + user.Pseudo);
			session.user = user;
			res.redirect('/');
		} else {
			console.log("Password erroné");
			res.render('connexion',{ login: req.body.login });
		}
		}, function(error) {
			console.error(error);
			res.render('connexion', { compte: "inexistant"});
		});
	});
//
// docClient.get(params, function(err, data) {				//On récupère les donnée de la database
// 	if (err) {
// 		console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
// 		res.redirect('/');
// 	} else {
// 		console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
// 		if (isEmptyObject(data)) {							//Si le nom d'utilisateur n'existe pas
// 		console.log("Nom d'utilisateur inexistant");
// 		res.render('connexion', { compte: "inexistant"});
// 	} else {											//Si le nom d'utilisateur existe
// 	if (req.body.password == data.Item.Password) {
// 		console.log("Connecté : " + req.body.login);
// 		session.login = req.body.login;
// 		session.type = data.Item.Type;
// 		res.redirect('/');
// 	} else {
// 		console.log("Password erroné");
// 		res.render('connexion',{ login: req.body.login });
// 	}
// }
// }
// }
// );

// );
//
// function isEmptyObject(obj) {
// 	return !Object.keys(obj).length;
// }

module.exports = router;
