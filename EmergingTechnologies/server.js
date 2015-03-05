var express = require('express');
var app = express();

//prodive path to setup start page
app.use(express.static(__dirname + '/Public'));

//creating a port for this application
var port = process.env.PORT || 1234;

app.listen(port);

//proving more information of application URL
console.log('Application running on http://localhost:' + port);