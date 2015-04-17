console.log('*** app start ***');

console.log('***      module.filename = ' + module.filename + ' ***');
console.log('***           __filename = ' + __filename + ' ***');
console.log('***            __dirname = ' + __dirname + ' ***');
console.log('***        process.cwd() = ' + process.cwd() + ' ***');
console.log('*** require.main.filename= ' + require.main.filename + ' ***');

console.log('*** app end ***');

require('./test.js');
