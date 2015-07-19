var router = require('express').Router();
var paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox',
  'client_id': 'AYHSH39E8xSdfteQE0vSUarc_mUDNDVvxCBQW9fvyqg89DYGmRfaWriY8slSdCH6qvTm4ZUMjcPTqhzW',
  'client_secret': 'EEhWRSO7vw0FyUwBmwpMVzaAqM6oOkIpyYQxQiXpDQhw3ANwUg_jLtsbauQcIQmuyA2fb5ys5OipvW60'
});

router.get('/', function(req, res) {

  var payment_details = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal",
    },
    "redirect_urls": {
        "return_url": "http:\/\/45.55.193.224\/#\/paypalsuccess",
        "cancel_url": "http:\/\/45.55.193.224\/api\/purchase\/fail"
    },
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total": "1.00"
        },
        "description": "This is the payment description."
    }]
  };

  paypal.payment.create(payment_details, function(error, payment){
    if(error){
      console.error(error);
    } else {
      //console.log(payment);
      res.send(payment);
    }
  });
});

module.exports = router;
