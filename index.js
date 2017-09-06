const { Formatter } = require('cucumber');

class PrettyFormatter extends Formatter {
  constructor() {
    super();
    console.log(arguments);
  }
}

module.exports = PrettyFormatter;
