var router = require('express').Router();
var path = require('path');
var cp = require('child_process');
var phantomjs = require('phantomjs');
var binPath = phantomjs.path;

var screenDir = 'screens';
var format = 'png';

router.get('/', function(req, res) {

    //console.log(binPath);
    //console.log(req.query.url);

    var fileName = req.query.url
                    .replace('http://', '')
                    .replace('https://', '')
                    .replace('/', '-') 
                    + '-' + (new Date()).getTime()

    var childArgs = [
        path.join(__dirname, '../../../phantom', 'github.js'),
        req.query.url,
        screenDir + '/' + fileName
    ]

    cp.execFile(binPath, childArgs, function(err, stdout, stderr) {
        //console.log('err ' + err);
        //console.log('stdout: ' + stdout);
        //console.log('stderr: ' + stderr);

        //res.send('Successfully rendered ' + fileName + '\n');
        var filePath = path.join(__dirname, '../../../', screenDir, '/', fileName + '.' + format) 
        
        res.sendFile(filePath);
    });
});

module.exports = router;
