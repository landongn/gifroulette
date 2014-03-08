/*global Passport*/

module.exports = {
	method: "GET",
	path: '/auth/twitter',
	config: {auth: 'passport'},
	handler: function (request, reply) {
		Passport.authenticate('twitter')(request, reply);
	}
};