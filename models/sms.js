var mongoose = require('mongoose');

var SMSSchema = new mongoose.Schema({
    SMS: {
        type : String,
        required : true
    },
    GeneralList: {
      type: [String]
    }


});


module.exports = mongoose.model('sms', SMSSchema);
