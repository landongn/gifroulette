/*global Passport*/

module.exports = {
	method: "GET",
	path: '/auth/twitter/callback',
	config: {auth: 'passport'},
	handler: function (request, reply) {
		Passport.authenticate('twitter', {
			failureRedirect: '/login',
			successRedirect: '/',
			failureFlash: true
		})(request, reply, function () {
			reply().redirect('/');
		});
	}
};