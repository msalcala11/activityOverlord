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



			// After successfully creating the user
			// redirect to the show action
			//res.json(user);

			res.redirect('user/show/'+user.id);
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
	}

	


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  //_config: {}

  
};
