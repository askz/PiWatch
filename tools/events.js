#!/usr/bin/env node

var http = require('http'),
    httpSync = require('http-sync'),
    uuid = require('node-uuid'),
    mongoose = require('mongoose');

request = require('request-json');
var client = request.createClient('http://piwatch.zkp.fr/');

var PWSend = require('../NotifMod/PiWatchSender.js')

var date_start, date_end, id, eventType
    timestamp = Math.floor(new Date/1000),
    id = uuid.v1();

switch (process.argv[2]) {
    case 'motion_start':
        eventType = 'motion';
        date_start = timestamp;
        PWSend.setMessage('Motion detected !', PWSend.defaultLink);
        PWSend.send();
        client.post('notification', {type: eventType, date_start:date_start}, function(err, res, body) {
            console.log('Notification posted.');
        });
        var exec = require('child_process').exec;
        exec('tools/sendsms.sh 0665788455 "PiWatch: Motion detected !\n Livestream\'s up at '+ PWSend.defaultLink +'"', function(error, stdout, stderr) {
            console.log('SMS sended');
            if (error !== null) {
                console.log('sms error: ' + error);
            }
        });

        break;
    case 'motion_end':
        eventType = 'motion';
        date_end = timestamp;
        break;
}





