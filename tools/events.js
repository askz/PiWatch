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
//console.log(process.argv);

switch (process.argv[2]) {
    case 'motion_start':
        eventType = 'motion';
        date_start = timestamp;
        PWSend.setMessage('Motion detected !', PWSend.defaultLink);
        PWSend.send();
        client.post('notification', {type: eventType, date_start:date_start}, function(err, res, body) {
            console.log('Notification posted.');
        });
        break;
    case 'motion_end':
        eventType = 'motion';
        date_end = timestamp;
        break;
}





