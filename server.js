var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');

var options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};
//database connection
var mongodbUri = 'mongodb://heroku_app35758595:lv56hiaj41042a2hh58vq9mq6o@ds061621.mongolab.com:61621/heroku_app35758595';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

mongoose.connect(mongooseUri, options);
var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', function () {
    console.log("Database connected");
});

//appending schema to usermodel
var UserSchema = new mongoose.Schema({
    username: String,
    name: String,
    phoneno: String,
    email: String,
    password: String
});

//creating UserModel schema in database
var UserModel = mongoose.model('UserModel', UserSchema);


var visit = new mongoose.Schema({
    complaint: String,
    billing_amt: Number
});

var patientSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    visits: [{ complaint: String, billing_amt: Number }],
    age: Number,
    family_doctor_id: String,
    phoneno: Number,
    created_at: { type: Date, default: Date.now },
    last_modified: { type: Date, default: Date.now }
});



var patientsModel = mongoose.model('patientsModel', patientSchema);


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
app.use(session({
    secret: 'myvillageworld',
    saveUninitialized: true,
    resave: true
}));
app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session());
//prodive path to setup start page
app.use(express.static(__dirname + '/Public'));


passport.use(new LocalStrategy(
function (username, password, done) {
    UserModel.findOne({ username: username, password: password }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user);
    })
}));


passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});


//login doctor 
app.post('/doclogin', passport.authenticate('local'), function (req, res) {
    var user = req.user;
    res.json(user);
});

app.get('/loggedin', function (req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
});


//logout function to remove cuurent user information
app.post('/logout', function (req, res) {
    req.logOut();
    res.sendStatus(200);
});

//Creating doctor profile
app.post('/docregister', function (req, res) {
    var newUser = req.body;
    UserModel.findOne({ username: newUser.username }, function (err, user) {
        if (err) { return next(err); }
        if (user) {
            res.json(null);
            return;
        }
        var newUser = new UserModel(req.body);
        newUser.save(function (err, user) {
            req.login(user, function (err) {
                if (err) { return next(err); }
                res.json(user);
            });
        });
    });
});

app.get('/DocInfo', function (req, res) {
    UserModel.find(function (err, users) {
        res.json(users);
    });
});

var auth = function (req, res, next) {
    if (!req.isAuthenticated())
        res.sendStatus(401);
    else
        next();
};
//list of single doctor's patients list

app.get('/PatientInfoDoc', auth, function (req, res) {
    console.log(req.user.username);
    patientsModel.find({family_doctor_id : req.user.username }, function (err, user) {
        res.json(user);
    });
});

//patient registration

app.post('/patientreg', function (req, res) {
    var patientReg = new patientsModel(req.body);
    patientReg.save(function (err, doc) {
        res.json(doc);
    });
});

//Get all patients information
app.get('/PatientInfo', function (req, res) {
    patientsModel.find(function (err, doc) {
        res.json(doc);
    });
});


//get single record from patient schema
app.get('/patientModels/:id', function (req, res) {
    var id = req.params.id;
    patientsModel.findOne({ _id: id }, function (err, doc) {
        res.json(doc);
    });
});

//Update selected patient record

app.put('/patientModelsUpdate/:id', function (req, res) {
    patientsModel.findById(req.params.id, function (err, user) {
        user.update(req.body, function (err, count) {
            patientsModel.find(function (err, users) {
                res.json(users);
            });
        });
    });
});


// Remove selected patient record from patient schema
app.delete("/patientModelsRemove/:id", function (req, res) {
    patientsModel.findById(req.params.id, function (err, user) {
        user.remove(function (err, count) {
            patientsModel.find(function (err, users) {
                res.json(users);
            });
        });
    });
});

//Post patient visits
app.post('/patientVists', function (req, res) {
    patientsModel.findOne({ _id: req.body._id }, function (err, Patients) {
        Patients.visits.push({ complaint: req.body.complaint, billing_amt: req.body.billing_amt })
        Patients.save(function (err, item) {
            res.json(item);
        })
    })
});


    //creating a port for this application
    var port = process.env.PORT || 1234;

    app.listen(port);

    //proving more information of application URL
    console.log('Application running on http://localhost:' + port);
