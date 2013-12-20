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
		res.view(); //returens new.ejs (I guess its just smart like that - it looks for a file that mathces the name of the route)
	},	

	create: function(req, res){
		//Create a User with the params sent from the sign-up form --> new.ejs
		User.create(req.params.all(), function userCreated(err, user){

			// If there's an error
			if (err) return next(err);

			// After successfully creating the user
			// redirect to the show action
			res.json(user);
		});
	}


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  //_config: {}

  
};
