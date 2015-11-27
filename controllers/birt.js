genReport(res, quety){
}
var Birt = {
  function: go(res, action, query){
    switch (action){
      case 'genReport':
      genReport(res, query);
      break;
    }
  }
}
module.exports = BirtService;
