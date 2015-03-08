

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hmis');

var db = mongoose.connection;

var doctorSchema = mongoose.Schema({
    email: String,
    name: String,
    password: String
});

var DoctorModel = mongoose.model('Dcotor', doctorSchema);

db.on('error', console.error.bind(console, "connection error"));

exports.add = function (request, response) {
    var newDoctor = { email: request.body.name, name: request.body.name, password: request.body.password };
    DoctorModel.create(newDoctor, function (addError, addedDoctor) {
        response.json(addedDoctor);
    });

};
