var requirejs = require('requirejs');

requirejs.config({
    nodeRequire: require
});

requirejs([
    'http',
    'express',
    'socket.io',
    'fs',
    'child_process'],

function(
    http,
    express,
    socketio,
    fs,
    child_process) {

    var lastImage = null,
        noImage = false,
        clients = 0,
        motionTargetDirectory = '/tmp/motion/',
        motionConfFile = __dirname + '/motion.conf';

   	startMotion();

    var app = express();
        app.set('port', process.env.PORT || '8888');

    //serves out index.html
    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/client/index.html');
    });

    //serves out index.html
    app.get('/client.js', function(req, res) {
        res.sendFile(__dirname + '/client/client.js');
    });

    var server = http.createServer(app);

    server.listen(app.get('port'), function(){
        console.log('server listening on port ' + app.get('port'));
    });


    function startMotion() {
        exec = child_process.exec;
        var motion = exec('motion -c ' + motionConfFile + ' &', function(error, stdout, stderr) {
            if(error) { return; }
            console.log(motion.pid);
        });
    }

});