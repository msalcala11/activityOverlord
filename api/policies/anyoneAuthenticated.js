/**
 * Allow a logged-in user to see, edit and update their own profile
 * Allow admins to see everyone
 */

 module.exports = function(req, res, next) {
 	var sessionUserMatchesIdRequested = req.session.User.id == req.param('id');
 	var isAdmin = req.session.User.admin;

 	// The requested id does not match the user's id, 
 	// and this is not an admin

 	if (!(sessionUserMatchesIdRequested || isAdmin)) {
 		var noRightsError = [{name: 'noRights', message: 'You must be an admin.'}];
 		req.session.flash = {
 			err: noRightsError
 		}
 		res.redirect('/session/new');
 		return;
 	}

 	next();
 };