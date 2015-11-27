var url = require('url');
Routes = {
  go: function(req, res){
    var surl = url.parse(req.url, true, false);
    var path = surl.pathname.split('/');
    path.shift();
    var controller = require('./controllers/'+path[0]+'.js')
    controller.go(res, path[1], surl.query);
  }
}
module.exports = Routes;
