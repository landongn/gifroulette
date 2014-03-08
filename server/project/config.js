var config = {
    hostname: 'localhost',
    port: 8000,
    urls: {
        failureRedirect: '/login',
        successRedirect: '/'
    },
    twitter: {
        consumerKey: "kaAunwc6D90LgnojtB1NA",
        consumerSecret: "IQni6Avy989FublQOVWBCtIjQssPVC2BaocYkb0k",
        callbackURL: "http://gifroulette.tv/auth/twitter/callback"
    },
    views: {
        engines: {
            jade: 'jade',
        },
        path: __dirname + '/templates',
        compileOptions: {
            pretty: true
        }
    },
    files: {
        path: 'cwd'
    }
};

module.exports = config;