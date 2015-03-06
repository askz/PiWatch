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

    fs.exists(motionTargetDirectory, function(exists) {
        if (!exists) {
            fs.mkdir(motionTargetDirectory, '0777', function() {
                startMotion();
            });
        } else {
            startMotion();
        }
    });

    var app = express();
        app.set('port', process.env.PORT || '8888');
    
    var server = http.createServer(app);
    
    var io = socketio.listen(server);
        io.set('log level', 0);
    
    var pic = io.of('/picture');
    
    pic.on('connection', function(socket) {
        sendImage(lastImage);
    });
    
    io.sockets.on('connection', function(socket) {
        var address = socket.handshake.address;
        console.log("New connection from " + address.address + ":" + address.port);
        clients++;
        socket.on('disconnect', function() {
            var address = socket.handshake.address;
            console.log("Client disconnected " + address.address + ":" + address.port);
            clients--;
        });
    });
    
    //serves out index.html
    app.get('/', function(req, res) {
        res.sendfile(__dirname + '/client/index.html');
    });

    //serves out index.html
    app.get('/client.js', function(req, res) {
        res.sendfile(__dirname + '/client/client.js');
    });
        
    server.listen(app.get('port'), function(){
        console.log('server listening on port ' + app.get('port'));
    }); 

    function sendImage(imgData) {
        if (imgData !== null) {
            pic.volatile.emit('frame', {
                data : lastImage.toString('base64'),
                'clients' : clients
            });
        }
    }

    function readImageFile() {
        files = fs.readdirSync(motionTargetDirectory);
        var newest = motionTargetDirectory + files[files.length - 1];
        fs.readFile(newest, function(err, data) {
            if (err) {
                if (!noImage) {
                    console.log('no image');
                    noImage = true;
                }
            } else {
                lastImage = data;
                if (noImage) {
                    noImage = false;
                    console.log('...continue');
                }
            }
        });
        if (!noImage) {
            sendImage(lastImage);
        }
        for (i = 0; i < files.length; i++) {
            fs.unlink(motionTargetDirectory + files[i]);
        }
    }

    setInterval(function(self) {
        readImageFile();
    }, 50, this);
    
    function startMotion() {
        exec = child_process.exec;
        var motion = exec('motion -c ' + motionConfFile + ' &', function(error, stdout, stderr) {
            if(error) { return; }
            console.log(motion.pid);
        });
    }

});