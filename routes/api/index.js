var router = require('express').Router();

router.get('/', function(req, res) {
    res.send('working!');
});

module.exports = router;
