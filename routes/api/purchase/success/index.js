var router = require('express').Router();
var paypal = require('paypal-rest-sdk');

router.get('/', function(req, res) {
  console.log(req.query.PayerID);

  var execute_payment_details = { "payer_id": req.query.PayerID };
  paypal.payment.execute(req.query.paymentId, execute_payment_details, function(error, payment){
    if(error){
      console.error(error);
      res.send(error);
    } else {
      //console.log(payment);
      res.send(payment);
    }
  });
})

module.exports = router;
