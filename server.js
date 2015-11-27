//Lets require/import the HTTP module
var http = require('http');
var fs = require('fs');
var url = require('url');

//Lets define a port we want to listen to
const PORT = 8080;

//We need a function which handles requests and send response
function handleRequest(req, res) {
  var surl = url.parse(req.url, true, false);
  console.log(surl.pathname);
    fs.readFile('./..' + surl.pathname, function(err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function() {
  //Callback triggered when server is successfully listening. Hurray!
  console.log("Server listening on: http://localhost:%s", PORT);
});
