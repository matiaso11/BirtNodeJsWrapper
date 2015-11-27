//Lets require/import the HTTP module
var http = require('http');
var routes = require('./routes.js')

const PORT = 8081;

http.createServer(function (req, res){
  routes.go(req, res);
}).listen(PORT, function() {
  console.log("Server listening on: http://localhost:%s", PORT);
});
