var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

router.get('/', function(req, res) {

    if(req.isAuthenticated()) {

        res.send(req.user);
    } else {

        res.send(false);
    }
});


module.exports = router;
