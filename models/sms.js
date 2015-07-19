var mongoose = require('mongoose');

var SMSSchema = new mongoose.Schema({
    SMS: {
        type : String,
        required : true,
        unique: true
    },
    GeneralList: {
      type: [String]
    },
    Counter: {
    	type : int
    }


});


module.exports = mongoose.model('sms', SMSSchema);
