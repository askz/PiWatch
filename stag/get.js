function get(){
    httpSync = require('http-sync');

    var request = httpSync.request({
        method: 'GET',
        protocol: 'http',
        host: 'admin:admin@localhost',
        port: 8082,
        path: '/0/config/get?query=' + process.argv[2],
        //    auth: 'admin:admin'
    });

    var timedout = false;
    request.setTimeout(1000000, function(){
        console.log("Request Timedout!");
        timedout = true;
    });
    var response = request.end();

    if (!timedout){
        var trolo = response.body.toString().split('\n');
        var value = trolo[0].split(' = ')[1];
        return value;
    }
}
