$(document).ready(function() {
    var connection = io.connect('/picture'), 
        $img = $('#frame'), 
        $counter = $('#counter'), 
        $clients = $('#clients'), 
        reloadCount = 0;

    connection.on('frame', function(frame) {
        if (frame.data.length < 10000) {
            return;
        }
        $img.attr('src', 'data:image/png;base64,' + frame.data);
        $counter.text('Frames: ' + reloadCount);
        $clients.text('Clients: ' + frame.clients);
        reloadCount += 1;
    });

    connection.on('clients', function(clients) {
        $clients.text = clients;
    });
});