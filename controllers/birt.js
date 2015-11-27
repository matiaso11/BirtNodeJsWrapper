var os = require('os');
var childProcess = require('child_process');
var execOptions = {maxBuffer: 100*1024, encoding:'utf8', timeout:5000};
var reportTemp = 'hello_world.rptdesign'

function linuxGenReport(res, query){
    console.log(query);
    var child = childProcess.execFile('./ReportEngine/genReport.sh',
     ['-f', 'PDF', './ReportTemp/'+reportTemp],
     execOptions, function (err, stdout, stderr){
       if (err){
         console.log(err.stack);
       }
     });
     child.on('exit',function(){
       console.log('Generate report.');
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
