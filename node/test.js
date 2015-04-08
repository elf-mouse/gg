var inquirer = require('inquirer');

function ask() {
  inquirer.prompt([{
    type: 'list',
    name: 'cmd',
    message: 'What do you want to do?',
    choices: [
      'Zip Package',
      'Build',
      'First Build',
      new inquirer.Separator(),
      'Exit'
    ],
    default: 'Build'
  }], function(answers) {
    switch (answers.cmd.toLowerCase()) {
      case 'zip package':
        console.log('run zip package');
        break;
      case 'build':
        console.log('run build');
        break;
      case 'first build':
        inquirer.prompt([{
          type: 'confirm',
          name: 'reset',
          message: 'Are your sure?',
          default: false
        }], function(answers) {
          if (answers.reset) {
            console.log('run first build');
          } else {
            ask();
          }
        });
        break;
      case 'exit':
        console.log('bye!');
        break;
    }
  });
}

ask();
