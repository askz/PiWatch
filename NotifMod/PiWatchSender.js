var gcm = require('node-gcm');
var sender = new gcm.Sender('AIzaSyB4i1FPZ1M0dV95fLmavIj9pMaQw_CVtZY');
var fs = require('fs');
var path = require('path');
var filePath = path.join(__dirname, 'regid');
var title = 'Test Event';
var link = 'http://admin:admin@piwatch.zkp.fr/api/motion/stream';


module.exports = {
    setPath: function(path) {
        filePath = path;
    },

    getPath: function() {
        return filePath;
    },

    setMessage: function(eventTitle, url) {
        title = eventTitle;
        link = url;
    },

    send: function() {
        var message = new gcm.Message({
            collapseKey: 'Pi\'Watch',
            delayWhileIdle: true,
            timeToLive: 3,
            data: {
                EVENT: title,
                DATE:  Date.now(),
                LINK: link
            }
        });

        console.log(message);

        console.log('Reading file: ' + filePath);
        fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
            if (!err) {
                var registrationIds = data.toString().split('\n');
                console.log(registrationIds.length);
                while ((idx = registrationIds.indexOf("")) !== -1) {
                    registrationIds.splice(idx, 1);
                }
                if (registrationIds.length > 0) {
                    console.log('Sending message to: ' + registrationIds);
                    sender.sendNoRetry(message, registrationIds, function(err, result) {
                        if (err) console.error(err);
                        else {
                            console.log('Sent message with result: ');
                            console.log(result);
                        }
                    });
                } else {
                    console.log('No registered device');
                }
            } else {
                console.log(err);
            }
        });
    }
}