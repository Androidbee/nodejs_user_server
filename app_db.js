var http = require('http'),
fs = require('fs'),
qs = require('querystring'),
url = require('url'),
Db = require('mongodb').Db,
Connection = require('mongodb').Connection,
DbServer = require('mongodb').Server,
PORT = 12345;

http.createServer( function(req, res) {
    // 변수를 선언합니다.
	var path = url.parse(req.url, true).pathname;
    var q = url.parse(req.url, true).query;

    if(req.method == 'GET') {
    	console.log('request by GET:' + q + '/' + JSON.stringify(q));
    	
    	new Db('usertable_tutorial', 
				new DbServer("127.0.0.1", 27017), {safe:false} ).open(function(err, db) {
					var result;
					db.collection('documents', function(err, collection) {
						collection.find().toArray(function(err, result) {
						    if (err) throw err;
						    res.writeHead(200, { 'Content-Type': 'text/plain' });
				            res.end(JSON.stringify(result));
				            db.close();
						});
					});
					
		        });

    } else if( req.method == 'POST') {
    	var body = '';
    	console.log('request by POST');
    	req.on('data', function (data) {
    		body += data;
    	});
    	req.on('end', function() {
    		var queryString = qs.parse(body);// { "":"" }
    		console.log("user_id:" + queryString.user_id + "/ name:" + queryString.user_name );
    		new Db('usertable_tutorial', 
				new DbServer("127.0.0.1", 27017), {safe:false}).open(function(err, db) {

					db.collection('documents', function(err, collection) {

						collection.insert(queryString, function(err, document) {

							res.writeHead(200, { 'Content-Type': 'text/plain' });
				            res.end(JSON.stringify(document));

						});
					});
				});

    	});
    }
}).listen(PORT, function() {
    console.log('Server running at :'+PORT);
});

