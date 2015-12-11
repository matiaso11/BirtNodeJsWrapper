var os = require('os');
var childProcess = require('child_process');
var uuid = require('node-uuid');
var fs = require('fs');
var execOptions = {maxBuffer: 100*1024, encoding:'utf8', timeout:5000};
var path = require("path");

function linuxGenReport(res, query){
    console.log(query);
    tmpName = uuid.v1()+'.'+query.format;
    var child = childProcess.execFile('./ReportEngine/genReport.sh',
     ['-f', query.format,'-o','./ReportTemp/'+tmpName, './ReportTemp/'+query.template], function (error, stdout, stderr){
       if (error){
         console.log(error.stack);
         console.log('error code: '+error.code);
         console.log('error signal: '+error.signal);
       }
     });
     child.on('exit',function(code){
       console.log('Generate report. Code: '+code);
       fs.readFile('./ReportTemp/'+tmpName, function(err, data){
        if (err) {
          res.writeHead(404);
          res.end(JSON.stringify(err));
          return;
        }
        res.writeHead(200);
        res.end(data);
      });
      fs.unlink('ReportTemp/'+tmpName, function(err){
        console.log(err ? "Usuwanie pliku nie powiodło się" : "Usunięto plik");
      });
     });
}

function winGenReport(res, query){
  console.log(query);
    tmpName = uuid.v1()+'.'+query.format;
    var dirname = path.resolve(__dirname);
    var dirnameLength = dirname.length;
    var dirname = dirname.slice(0,dirnameLength-11)
    console.log(dirname);
    var child = childProcess.execFile(dirname + 'ReportEngine\\genReport.bat',
     ['-f', query.format,'-o',dirname + 'ReportTemp\\'+tmpName, dirname + 'ReportTemp\\'+query.template], function (error, stdout, stderr){
       if (error){
         console.log(error.stack);
         console.log('error code: '+error.code);
         console.log('error signal: '+error.signal);
       }
     });
     child.on('exit',function(code){
       console.log('Generate report. Code: '+code);
       fs.readFile(dirname + 'ReportTemp\\'+tmpName, function(err, data){
        if (err) {
          res.writeHead(404);
          res.end(JSON.stringify(err));
          return;
        }
        res.writeHead(200);
        res.end(data);
      });
      fs.unlink(dirname + 'ReportTemp\\'+tmpName, function(err){
        console.log(err ? "Usuwanie pliku nie powiodło się" : "Usunięto plik");
      });
     });
}

function genReport(res, query){
  switch (os.platform()[0]){
    case 'l':
    linuxGenReport(res, query);
    break;
    case 'w':
    winGenReport(res, query);
    break;
  }
}
var Birt = {
  go: function(res, action, query){
    switch (action){
      case 'genReport':
      genReport(res, query);
      break;
    }
  }
}
module.exports = Birt;
