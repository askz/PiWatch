var unirest = require('unirest');
var url = 'http://admin:admin@10.104.30.116:8082/0/config/set?'+process.argv[2]+'='+process.argv[3];
var request = unirest.get(url);


function set() {
	request.header('Accept', 'text/plain').end(function (response) {
  	return true;
	});
}
