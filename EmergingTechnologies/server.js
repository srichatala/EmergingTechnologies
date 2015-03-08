var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var mongoOps = require('./Config/Database.js');

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

app.post('/docReg', mongoOps.add);

//prodive path to setup start page
app.use(express.static(__dirname + '/Public'));

//creating a port for this application
var port = process.env.PORT || 1234;

app.listen(port);

//proving more information of application URL
console.log('Application running on http://localhost:' + port);