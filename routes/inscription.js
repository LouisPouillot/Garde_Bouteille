var express = require('express');
var AWS = require('aws-sdk');
var router = express.Router();

AWS.config.loadFromPath('./config.json');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('inscription');
});

router.post('/', function(req, res, next) {

	var docClient = new AWS.DynamoDB.DocumentClient();
	var table = "GardeBouteille";
	var pseudo = req.body.login;
	var password = req.body.password;
	var email = req.body.email;

	var paramsGet = {
	    TableName: table,
	    Key:{
	        "Pseudo": pseudo
	    }
	};

	var paramsAdd = {
	    TableName: table,
	    Item:{
	        "Pseudo": pseudo,
	        "Password": password,
	        "Email": email
	    }
	};
	docClient.get(paramsGet, function(err, data) {				//On récupère les donnée de la database
		if (err) {
			console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
			res.redirect('/');
		} else {
			console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
			if (!isEmptyObject(data)) {							//Si le nom d'utilisateur n'existe pas
				console.log("Utilisateur déjà existant");
				res.redirect('/');
			} else {
				console.log("Adding a new item...");
				docClient.put(paramsAdd, function(err, data) {
					if (err) {
						 console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
				    } else {
				        console.log("Added item:", JSON.stringify(data, null, 2));
				    }
				    res.redirect('/');
				});
			}
		}
	});

});


function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

module.exports = router;
