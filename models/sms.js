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
    Paragraphs:{
      type: String
    },
    Counter: {
    	type : Number
    }


});


module.exports = mongoose.model('sms', SMSSchema);
