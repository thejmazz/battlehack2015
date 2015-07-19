var mongoose = require('mongoose');

var Sponsers = new mongoose.Schema({
    company: {
        type : String,
        required : true,
        unique: true
    }
});


module.exports = mongoose.model('sponsers', Sponsers);
