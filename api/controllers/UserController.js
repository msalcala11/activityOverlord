/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  	// This loads the sign-up page --> new.ejs
	new: function(req, res){
		//res.locals.flash = _.clone(req.session.flash);
		res.view(); //returens new.ejs (I guess its just smart like that - it looks for a file that mathces the name of the route)
		//req.session.flash = {};
	},	

	create: function(req, res){
		//Create a User with the params sent from the sign-up form --> new.ejs
		User.create(req.params.all(), function userCreated(err, user){

			// If there's an error
			//if (err) return next(err);
			if (err) {
				console.log(err);
				req.session.flash = {
					err: err
				}

				


				// If error redirect back to sign-up page
				return res.redirect('user/new');
			}

			req.session.authenticated = true;
			req.session.User = user;

			//req.session.User.online = true; why cant we do this?

			user.online = true;
			user.save(function(err, user) {
				if (err) return next(err);

				//Let other subscribed sockets know that the user was created
				//Lets also add the action message to the user object to be displayed as a flash when a user is created
				user.action = " signed-up and logged-in.";
				User.publishCreate(user);


				// After successfully creating the user
				// redirect to the show action

				res.redirect('user/show/'+user.id);
			});		
		});
	},

	// render the profile view (e.g. /views/show.ejs)
	show: function(req, res, next) {
		User.findOne(req.param('id'), function foundUser(err, user) {
			if (err) return next(err);
			if(!user) return next();

			res.view({
				user: user
			});
		});
	},

	index: function(req, res, next) {

		// Get an array of all users in the User collection (e.g. table)
		User.find(function foundUsers (err, users) {
			if(err) return next(err);
			//pass the array down to the /views/index.ejs page
			res.view({
				users: users
			});
		})
	},

	// render the edit view (e.g. /views/edit.ejs)
	edit: function(req, res, next) {

		User.findOne(req.param('id'), function foundUser(err, user) {
			if(err) return next(err);
			if(!user) return next('User doesn\'t exist.');

			res.view({
				user: user
			});
		});
	},

	// process the info from the edit view
	update: function(req, res, next) {

		User.update(req.param('id'), req.params.all(), function userUpdated(err, user) {
			if (err) {
				return res.redirect('user/edit' + req.param('id'));
			}

			res.redirect('/user/show/' + req.param('id'));
		});
	},

	destroy: function(req, res, next) {

		User.findOne(req.param('id'), function foundUser(err, user) {
			if(err) return next(err);
			if(!user) return next('User doesn\'t exist.');


			User.destroy(req.param('id'), function userDestroyed(err) {
				if (err) return next(err);

				User.publishUpdate(user.id, {
					name: user.name,
					action: ' has been deleted.'
				});

				User.publishDestroy(user.id);
			});

			//if the user is deleting himself, then we need to log him out as well
			if(req.param('id') == req.session.User.id){
				res.redirect('/session/destroy');
				return;
			}

			res.redirect('/user/index');

		});
	},

	subscribe: function(req, res, next) {

		User.find(function foundUser(err, users) {
			if (err) return next(err);

			//subscribe user to model class room
			User.subscribe(req.socket);

			//subscribe user to the model instance room
			User.subscribe(req.socket, users);

			//this will avoid a warning from the socket for trying to render HTML over the socket
			res.send(200);
		});
	}
};



	


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  //_config: {}

  
//};
