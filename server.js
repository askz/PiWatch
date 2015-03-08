#!/usr/bin/env node
var requirejs = require('requirejs');

requirejs.config({
    nodeRequire: require
});

requirejs([
    'http',
    'http-proxy',
    'express',
    'socket.io',
    'fs',
    'child_process'],

function(
    http,
    httpProxy,
    express,
    socketio,
    fs,
    child_process) {

    var clients = 0,
        motionConfFile = __dirname + '/motion.conf';

   	require('dns').lookup(require('os').hostname(), function (err, ip, fam) {
		var target = 'http://' + '127.0.0.1' +':8081';
		httpProxy.createProxyServer({target:target}).listen(8080);
		console.log("Started at " + target);
	})

    // var app = express();
    //     app.set('port', process.env.PORT || '8888');

    // //serves out index.html
    // app.get('/', function(req, res) {
    //     res.sendFile(__dirname + '/client/index.html');
    // });

    // //serves out index.html
    // app.get('/client.js', function(req, res) {
    //     res.sendFile(__dirname + '/client/client.js');
    // });

    // var server = http.createServer(app);

    // server.listen(app.get('port'), function(){
    //     console.log('server listening on port ' + app.get('port'));
    // });



    function startMotion() {
        exec = child_process.exec;
        var motion = exec('motion -c ' + motionConfFile + ' &', function(error, stdout, stderr) {
            if(error) { return; }
            console.log(motion.pid);
	    console.log("Motion started;");
        });
    }

     startMotion();


});
