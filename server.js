var http = require('http'); //http module for creating a server. This is the part we're testing.
//Just helper native modules. 
var fs = require('fs');    
var url = require('url');

//Create server on port 3000.
http.createServer(function (request, response) {
    console.log('request ', request.url);
    console.log('request method', request.method);

    var route = request.url.split('?')[0];
    var params = url.parse(request.url, true).query;

    if (route == '/' || route == '/index') {
        filePath = './index.html';
        respondWithFile(filePath, response);
    }
    else if (route == '/simple' && request.method == "GET") {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.end("Hello " + params.name, 'utf-8');
    }
    else if (route == '/mongo' && request.method == "GET") {
        
    }
    else if (route == '/mysql' && request.method == "GET") {
        
    }
    else if(request.method != "GET"){
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.end("Please use a GET http method", 'utf-8');
    }
    else{
        filePath = './index.html';
        respondWithFile(filePath, response);
    }
}).listen(3000);
console.log('Server running at http://127.0.0.1:3000/');

//Funtion to return a static file
function respondWithFile(filePath, response){
    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT') {
                response.writeHead(404, { 'Content-Type': 'text/plain' });
                response.end("404", 'utf-8');
            }
            else {
                response.writeHead(500);
                response.end(error.code);
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(content, 'utf-8');
        }
    });
}