/*global console*/

var Hapi = require('hapi');
var config = require('./config');
var io = require('socket.io');
var gifroulette = require('./gifroulette');
var mongoose = require('mongoose');
var User = require('./gifroulette/models/user');
var plugins = require('./plugins.js');

var TwitterStrategy = require('passport-twitter').Strategy;

/* server configuration ========================== */
var server = new Hapi.Server(config.hostname, config.port, {
	views: config.views
});

/* import plugins ================================ */
server.pack.require(require('./plugins.js'), function (err) {
    if (err) {
		throw err;
    }
});


server.auth.strategy('passport', 'passport');

var Passport = server.plugins.travelogue.passport;
Passport.use(new TwitterStrategy({
    consumerKey: config.twitter.consumerKey,
    consumerSecret: config.twitter.consumerSecret,
    callbackURL: "http://gifroulette.tv/auth/twitter/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ twitterId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

Passport.serializeUser(function(user, done) {
    done(null, user);
});
Passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

/* routes ========================================= */
server.route(require('./routes/lib'));
server.route(require("./routes/compiled"));
server.route(require('./routes/index'));
server.route(require('./routes/auth/login'));
server.route(require('./routes/auth/twitter/auth'));
server.route(require('./routes/auth/twitter/callback'));
/* end routes ===================================== */

server.start(function () {
	var listener = io.listen(server.listener);
	listener.set('log level', 1);
	var svr = new gifroulette(listener);
    console.log('server started on port: ', server.info.port);
});

