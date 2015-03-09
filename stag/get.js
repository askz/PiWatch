function get(){
    httpSync = require('http-sync');

    var request = httpSync.request({
        method: 'GET',
        protocol: 'http',
        host: 'admin:admin@172.17.0.10',
        port: 556,
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
