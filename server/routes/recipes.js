var unirest = require('unirest');
var express = require('express');
var router = express.Router();
// var passport = require('passport');
// var path = require('path');

// + req.query.text
// req.query.text = "";
router.get('/' , function(req , res){
console.log(req.query.text);
//unirest
  unirest.get("https://community-food2fork.p.mashape.com/search?key=50314a4cdf0488cfd23dcb086e0b3cb7&q=" + req.query.text)
  .header("X-Mashape-Key", "E3bmdMIYkUmshwnDHxTvflPcBA9vp1CPIDUjsnnfYhtrbUVICT")
  .header("Accept", "application/json")
  .end(function (result) {
    res.send(JSON.parse(result.body));
    // console.log("params ", req.params);
  });

});

// unirest.get("https://community-food2fork.p.mashape.com/get?key=50314a4cdf0488cfd23dcb086e0b3cb7")
// .header("X-Mashape-Key", "E3bmdMIYkUmshwnDHxTvflPcBA9vp1CPIDUjsnnfYhtrbUVICT")
// .header("Accept", "application/json")
// .end(function (result) {
//   res.send(JSON.parse(result))
// });
//
//
module.exports = router;
