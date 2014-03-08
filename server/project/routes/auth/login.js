
module.exports = {
	method: 'GET',
	path: '/login',
	config: {},
	handler: function (request, reply) {
		if (request.session) {
			reply().redirect('/');
		} else {
			reply.view('login');
		}
	}
};