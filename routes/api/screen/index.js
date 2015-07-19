var router = require('express').Router();
var path = require('path');
var cp = require('child_process');
var phantomjs = require('phantomjs');
var binPath = phantomjs.path;

var screenDir = 'public/src/screens';
var format = 'png';


function zeroFill(i) {
    return (i < 10 ? '0' : '') + i
}


router.get('/', function(req, res) {    
    var date = new Date();

    var fileName = req.query.url
                    .replace('http://', '')
                    .replace('https://', '')
                    .replace('/', '-')
                    + '-' + date.getTime();

    var fileMiniPath = screenDir +  '/' +
            date.getFullYear() + '/' +
            zeroFill(date.getMonth()) + '/' +
            zeroFill(date.getDate()) + '/' +
            fileName;

    //fileMiniPath = path.join('../../../public/src/', fileMiniPath);

    var childArgs = [
        path.join(__dirname, '../../../phantom', 'github.js'),
        req.query.url,
        fileMiniPath
    ]

    cp.execFile(binPath, childArgs, function(err, stdout, stderr) {
        //console.log('err ' + err);
        //console.log('stdout: ' + stdout);
        //console.log('stderr: ' + stderr);

        //res.send('Successfully rendered ' + fileName + '\n');
        //var filePath = path.join(__dirname, '../../../', fileMiniPath + '.' + format)

        res.send(fileMiniPath.replace('public/src/', '') + '.png');
        //res.sendFile(filePath);
    });
});

module.exports = router;
