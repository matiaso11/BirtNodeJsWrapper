var os = require('os');
var childProcess = require('child_process');
var uuid = require('node-uuid');
var execOptions = {maxBuffer: 100*1024, encoding:'utf8', timeout:5000};

function linuxGenReport(res, query){
    console.log(query);
    tmpName = uuid.v1()+'.PDF';
    var child = childProcess.execFile('./ReportEngine/genReport.sh',
     ['-f', 'PDF','-o','./ReportTemp/'+tmpName, './ReportTemp/'+query.template], function (error, stdout, stderr){
       if (error){
         console.log(error.stack);
         console.log('error code: '+error.code);
         console.log('error signal: '+error.signal);
       }
     });
     child.on('exit',function(code){
       console.log('Generate report. Code: '+code);
     });
}

function winGenReport(res, query){

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
