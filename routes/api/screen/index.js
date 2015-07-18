var router = require('express').Router();
var path = require('path');
var cp = require('child_process');
var phantomjs = require('phantomjs');
var binPath = phantomjs.path;

router.get('/', function(req, res) {

    console.log(binPath);

    var childArgs = [
      path.join(__dirname, '../../../phantom', 'github.js')
    ]

    cp.execFile(binPath, childArgs, function(err, stdout, stderr) {
        console.log('err ' + err);
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);

        res.send('finished?\n');
    });
});

module.exports = router;
