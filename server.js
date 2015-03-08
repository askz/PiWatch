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
        motionConfFile = __dirname + '/motion/motion.conf';

   	require('dns').lookup(require('os').hostname(), function (err, ip, fam) {
		var target = 'http://' + ip +':8081';
		httpProxy.createProxyServer({target:target}).listen(8080);
		console.log("Started at " + target);
	})

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
