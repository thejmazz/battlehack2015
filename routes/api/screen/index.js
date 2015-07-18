var router = require('express').Router;

router.get('/', function(req, res) {
    res.send('working in screen\n');
});

module.exports = router;
