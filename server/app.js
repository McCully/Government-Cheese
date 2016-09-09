var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var unirest = require('unirest');
var passport = require('./strategies/user_sql');
var session = require('express-session');
var index = require('./routes/index');
var user = require('./routes/user');
var register = require('./routes/register');
var recipes = require('./routes/recipes');
var initRecipes = require('./routes/initRecipes');
var faveData = require('./routes/faveData');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static(path.join(__dirname, './public')));

// Passport Session Configuration //
app.use(session({
   secret: 'secret',
   key: 'user',
   resave: 'true',
   saveUninitialized: false,
   cookie: { maxage: 60000, secure: false }
}));

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

//unirest
// unirest.get("https://community-food2fork.p.mashape.com/search?key=50314a4cdf0488cfd23dcb086e0b3cb7")
// .header("X-Mashape-Key", "E3bmdMIYkUmshwnDHxTvflPcBA9vp1CPIDUjsnnfYhtrbUVICT")
// .header("Accept", "application/json")
// .end(function (res) {
//   var result = res.body;
//   result = JSON.parse(result);
//   console.log(result.recipes);
//
// });
//
// unirest.get("https://community-food2fork.p.mashape.com/get?key=50314a4cdf0488cfd23dcb086e0b3cb7")
// .header("X-Mashape-Key", "E3bmdMIYkUmshwnDHxTvflPcBA9vp1CPIDUjsnnfYhtrbUVICT")
// .header("Accept", "application/json")
// .end(function (result) {
//   // console.log(result.body);
// });

// Routes
app.use('/faveData' , faveData);
app.use('/initRecipes' , initRecipes);
app.use('/recipes' , recipes);
app.use('/register', register);
app.use('/user', user);
app.use('/*', index);




// App Set //
app.set('port', (process.env.PORT || 3000));

// Listen //
app.listen(app.get("port"), function(){
   console.log("Listening on port: " + app.get("port"));
});
