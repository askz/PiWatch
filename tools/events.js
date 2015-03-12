#!/usr/bin/env node

var http = require('http'),
    uuid = require('node-uuid'),
    request = require('request-json');


//


var PWSend = require('../NotifMod/PiWatchSender.js')

var date_start, date_end, id, eventType
    timestamp = Math.floor(new Date/1000),
    id = uuid.v1(),
    phoneNumber = '';

switch (process.argv[2]) {
    case 'motion_start':
        eventType = 'motion';
        date_start = timestamp;
        PWSend.setMessage('Motion detected !', PWSend.defaultLink);
        PWSend.send();
        var client = request.createClient('http://piwatch.zkp.fr/');
        client.post('notification/', {id: id, type: eventType, date_start:date_start}, function(err, res, body) {
            console.log('Notification posted.');
        });
        var exec = require('child_process').exec;
        exec('tools/sendsms.sh '+ phoneNumber +' "PiWatch: Motion detected !\n Livestream\'s up at \n'+ PWSend.SMSLink +'"', function(error, stdout, stderr) {
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





