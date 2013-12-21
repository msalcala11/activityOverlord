module.exports = function(req, res, next) {

	//If the user is both valid and and admin, let them proceed
	if(req.session.User && req.session.User.admin){
		next();
		return;
	}
	// Otherwise take them back to the login page
	else{
		var adminRequiredError = [{name: 'adminRequiredError', message: 'You must be an administrator to access this page.'}];

		req.session.flash = {
			err: adminRequiredError
		}

		res.redirect('/session/new');
	}
}