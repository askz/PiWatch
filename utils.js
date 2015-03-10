/**
 * Created by askz on 09/03/15.
 */

var ip =  '10.104.10.84';

module.exports = {


    setMotionOption: function (option, value) {
        var unirest = require('unirest');
        var url = 'http://admin:admin@'+ ip +':8082/0/config/set?' + option + '=' + value;
        console.log(url);
        var request = unirest.get(url);
        request.header('Accept', 'text/plain').end(function (response) {
            return true;
        });
    },

    getMotionOption: function (option) {
        var httpSync = require('http-sync');

        var request = httpSync.request({
            method: 'GET',
            protocol: 'http',
            host: 'admin:admin@'+ ip +'',
            port: 8082,
            path: '/0/config/get?query=' + option
        });

        var timedout = false;
        request.setTimeout(1000000, function () {
            console.log("Request Timedout!");
            timedout = true;
        });
        var response = request.end();

        if (!timedout) {
            var result = response.body.toString().split('\n');
            return result[0].split(' = ')[1];
        } else {
            return false;
        }
    },

    sendSms: function (number, body){
        var sys = require('sys')
        var exec = require('child_process').exec;
        var child;

        var fonc = "./tools/sendsms.sh " + number + " \"" + body + "\""
        // executes `pwd`
        child = exec(fonc, function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
    }



};
