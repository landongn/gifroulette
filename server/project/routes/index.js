module.exports = {
	method: 'GET',
	path: '/',
	handler: function (request, reply) {
		/* do things with request; */
		reply.view('index', {
			title: 'gifroulette'
		});
	}
};
