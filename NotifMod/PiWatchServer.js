var express = require('express');
var bodyparser = require('body-parser');
var app = express();
var fs = require('fs');
var path = require('path');
var filePath = path.join(__dirname, 'regid');
var regid;

app.use(bodyparser.urlencoded({ extended: false}));

app.get('/', function(req, res){
    console.log('GET /')
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end("hello world!");
});

app.post('/', function(req, res){
    console.log('POST /');
   	if (req.body.hasOwnProperty) {
    	regid = req.body.regid;
    	console.log('Got regid: ' + regid);
        console.log('Reading file: ' + filePath);
        fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
            if (!err) {
                var registrationIds = data.toString().split('\n');
                while ((idx = registrationIds.indexOf("")) !== -1) {
                    registrationIds.splice(idx, 1);
                }
                if ((contain = registrationIds.indexOf(regid)) === -1) {
                    registrationIds.push(regid);
                    fs.writeFile(filePath, registrationIds.join('\n'), function(err) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("Saved " + filePath);
                    }
                }); 
                } else {
                    console.log('Device already registered');
                }
            } else {
                console.log(err);
            }
        });	
    }
});

port = 9999;
app.listen(port);
console.log('Listening at http://localhost:' + port)