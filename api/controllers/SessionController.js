/**
 * SessionController
 *
 * @module		:: SessionController
 * @description		:: Contains logic for handling requests
 */

 var bcrypt = require('bcrypt');

 module.exports = {

 	new: function(req, res) {
 		res.view('session/new');

 		// var oldDateObj = new Date();
 		// var newDateObj = new Date(oldDateObj.getTime() + 60000);
 		// req.session.cookie.expires = newDateObj;
 		// req.session.authenticated = true;
 		// console.log(new Date());

 		// console.log(req.session);
 	},

 	create: function(req, res) {

 		//Lets check to see if the user entered something for both the email and password fields
 		if(!req.param('email') || !req.param('password')){
 			var usernamePasswordRequiredError = [{name: 'usernamePasswordRequired', message: 'You must enter both a username and password.'}];

 			req.session.flash = {
 				err: usernamePasswordRequiredError
 			}

 			res.redirect('session/new');
 			return;
 		}

 		//Lets check to see if the email entered exists in the database
 		User.findOneByEmail(req.param('email')).done( function(err, user){
 			if (err) return next(err);

 			if(!user){
 				var noUserFoundError = [{name: 'noUserFound', message: 'The email address' + req.param('email') + 'is not associated with an existing account.'}];

 				req.session.flash = {
 					err: noUserFoundError
 				}

 				res.redirect('session/new');
 				return;
 			}
 	

 			console.log(user.email);
 			//Lets check to see if the password is correct
 			bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid) {
 				if (err) return next(err);

 				if(!valid){
 					var wrongPasswordError = [{name: "wrongPasswordError", message: "It looks like you may have mistyped your password. Please try again."}];

 					req.session.flash = {
 						err: wrongPasswordError
 					}

 					res.redirect('session/new');
 					return;
 				}

 				//Lets log authenticate them
 				req.session.authenticated = true;
 				req.session.User = user;

 				//Lets take them to their profile page
 				res.redirect('user/show/' + user.id);
 			});
 		});
 	},

 	destroy: function(req, res){
		req.session.destroy();
		res.redirect('/session/new');
	}
 }