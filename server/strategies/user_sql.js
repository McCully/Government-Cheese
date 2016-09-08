var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var encryptLib = require('../modules/encryption');
var connection = require('../modules/connection');
var pg = require('pg');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {

  console.log('called deserializeUser');
  pg.connect(connection, function (err, client) {

    var user = {};
    console.log('called deserializeUser - pg');
      var query = client.query("SELECT * FROM users WHERE id = $1", [id]);

      query.on('row', function (row) {
        console.log('User row', row);
        user = row;
        done(null, user);
      });


      query.on('end', function () {
          client.end();
      });


      if (err) {
          console.log(err);
      }
  });
});


passport.use('local', new localStrategy({
    passReqToCallback: true,
    usernameField: 'username'
    }, function(req, username, password, done){
	    pg.connect(connection, function (err, client) {
	    	console.log('called local - pg');
	    	var user = {};
        var query = client.query("SELECT * FROM users WHERE username = $1", [username]);

        query.on('row', function (row) {
        	console.log('User obj', row);
        	user = row;


          if(encryptLib.comparePassword(password, user.password)) {

            console.log('matched');
            done(null, user);
          } else {
            console.log('nope');
            done(null, false, {message: 'Incorrect credentials.'});
          }

        });


        query.on('end', function () {
            client.end();
        });


        if (err) {
            console.log(err);
        }
	    });
    }
));

module.exports = passport;
