const {printTable} = require('console-table-printer');
const {NUM_SPACES} = require('../config');

/**
 * Pretty prints JSON data
 * @param {object} data data to print
 */
function jsonPrinter(data) {
  console.log(JSON.stringify(data, null, NUM_SPACES));
}

/**
 * Prints data in a table
 * @param {object} data data to print
 */
function tablePrinter(data) {
  if (Array.isArray(data)) {
    printTable(data);
  } else if (typeof data == 'object') {
    printTable([data]);
  } else {
    // fallback to JSON format if table printing does not work
    jsonPrinter(data);
  }
}

module.exports = {
  tablePrinter: tablePrinter,
  jsonPrinter: jsonPrinter,
};
