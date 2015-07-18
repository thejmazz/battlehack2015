var router = require('express').Router();
var path = require('path');
var cp = require('child_process');
var phantomjs = require('phantomjs');
var binPath = phantomjs.path;

var screenDir = 'screens';

router.get('/', function(req, res) {

    //console.log(binPath);
    //console.log(req.query.url);

    var childArgs = [
        path.join(__dirname, '../../../phantom', 'github.js'),
        req.query.url,
        screenDir + '/' + req.query.url
                            .replace('http://', '')
                            .replace('https://', '')
                            .replace('/', '-') + '-' + (new Date()).getTime()
    ]

    cp.execFile(binPath, childArgs, function(err, stdout, stderr) {
        console.log('err ' + err);
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);

        res.send('finished\n');
    });
});

module.exports = router;
