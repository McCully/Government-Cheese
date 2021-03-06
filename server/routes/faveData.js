var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var pg = require('pg');
var bodyParser = require('body-parser');

var connectionString = '';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

if(process.env.DATABASE_URL !== undefined) {
    connectionString = process.env.DATABASE_URL + 'ssl';
} else {
    connectionString = 'postgres://localhost:5432/users';
}

router.post('/', function(req, res) {
    var faveResults=[];



    console.log(req.body);

    pg.connect(connectionString, function(err, client, done) {
        client.query('INSERT INTO favorites (recipe_id, img_url, title, source_url, f2f_url) VALUES ($1, $2, $3, $4 ,$5);',
            [req.body.recipeId, req.body.srcImg, req.body.title, req.body.srcUrl, req.body.f2fUrl],
            function(err, results) {
                done();
                if(err) {
                    console.log('Error inserting data: ', err);
                    res.send(false);
                } else {
                    res.send(results);
                }
            });
    });
});

router.get('/', function(req, res) {
    var results = [];

    pg.connect(connectionString, function(err, client, done) {
        var query = client.query('SELECT * FROM favorites');

        //Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        //close connection
        query.on('end', function() {
            done();
            //console.log(results);
            return res.json(results);
        });

        if(err) {
            console.log(err);
        }

    });
});

router.delete('/*', function(req, res) {
    var results = [];

    var id = req.params[0]
    console.log('id: ', id);


    pg.connect(connectionString, function(err, client, done) {
        client.query('DELETE FROM favorites WHERE api_id = ($1);',
            [id],

            function(err, results) {
                done();
                if(err) {
                    console.log('Error deleting data: ', err);
                    res.send(false);
                } else {
                    console.log(id);
                    res.send(results);
                }
            });

    });
});


module.exports = router;
