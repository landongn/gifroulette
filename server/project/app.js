/*global console*/

var Hapi = require('hapi');
var config = require('./config');
var io = require('socket.io');
var gifroulette = require('./gifroulette');

/* server configuration ========================== */
var server = new Hapi.Server(config.hostname, config.port, {
	views: config.views
});


/* import plugins ================================ */
server.pack.allow({ ext: true }).require(require('./plugins'), function (err) {
    if (err) {
		throw err;
    }
});

// var Passport = server.plugins.travelogue.passport;
// var LocalAuthentication = require('passport-local').Strategy;

// // Follow normal Passport rules to add Strategies
// Passport.use(/* Strategy Goes Here */ new LocalAuthentication(function (emailAddress, password, done) {
//		return done({ emailAddress: emailAddress }, null);
// })
// );

// Passport.serializeUser(require('./middleware/serializeUser'));
// Passport.deserializeUser(require('./middleware/deserializeUser'));

/* routes ========================================= */
server.route(require('./routes/lib'));
server.route(require("./routes/compiled"));
server.route(require('./routes/index'));
/* end routes ===================================== */

server.start(function () {
	var svr = new gifroulette(io.listen(server.listener));
    console.log('server started on port: ', server.info.port);
});

