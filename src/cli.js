const {Command, Option} = require('commander');
const Tasks = require('./tasks');
const {jsonPrinter, tablePrinter} = require('./print');
const program = new Command();
const tasks = new Tasks();
program.version('0.0.1');

program.addOption(new Option('-o, --output <type>',
    'output format').choices(['table', 'json']).default('json', 'json format'));

let printer = jsonPrinter;
program.on('option:output', (operands) => {
  if (operands == 'table') {
    printer = tablePrinter;
  }
});

program.command('list')
    .description('lists all tasks')
    .action(async (options) => {
      try {
        printer(await tasks.getTasks());
      } catch (error) {
        console.log(error.message);
      }
    });

program.command('get')
    .description('retrieve specific task')
    .requiredOption('-i, --id <id>', 'task id')
    .action(async (options) => {
      try {
        printer(await tasks.getTask(options));
      } catch (error) {
        console.log(error.message);
      }
    });


program.command('add')
    .description('add new task')
    .requiredOption('-n, --name <name>', 'task name')
    .requiredOption('-d, --description <description>', 'task description')
    .action(async (options) => {
      try {
        printer(await tasks.addTask(options));
      } catch (error) {
        console.log(error.message);
      }
    });

program.command('edit')
    .description('modify existing task')
    .requiredOption('-i, --id <id>', 'task id')
    .requiredOption('-n, --name <name>', 'task name')
    .requiredOption('-d, --description <description>', 'task description')
    .action(async (options) => {
      try {
        printer(await tasks.modifyTask(options));
      } catch (error) {
        console.log(error.message);
      }
    });

program.command('delete')
    .description('delete task')
    .requiredOption('-i, --id <id>', 'task id')
    .action(async (options) => {
      try {
        printer(await tasks.deleteTask(options));
      } catch (error) {
        console.log(error.message);
      }
    });

module.exports = program;
