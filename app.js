var http = require('http'),
fs = require('fs'),
qs = require('querystring'),
url = require('url'),
server,
PORT = 12345;

http.createServer( function(req, res) {
    // 변수를 선언합니다.
	var path = url.parse(req.url, true).pathname;
    var q = url.parse(req.url, true).query;
    
    if(req.method == 'GET') {
    	res.writeHead(200, {'Content-Type': 'text/html'});

    	console.log('request by GET:' + q + '/' + JSON.stringify(q));

    	res.end('');
    	
    } else if( req.method == 'POST') {
    	var body = '';
        console.log('request by POST');
        req.on('data', function (data) {
        	body += data;
        });
        req.on('end', function() {
        	var parsedData = qs.parse(body);
            console.log(parsedData);
            
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<ul><li>' + parsedData.user_id
            		+ '<li>' + parsedData.user_name
            		+ '</ul>');
        });
    }
}).listen(PORT, function() {
    console.log('Server running at :'+PORT);
});

