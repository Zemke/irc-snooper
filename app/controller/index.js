var config = require('../config/config');
var fs = require('fs');

exports.index = function () {
  return function (req, res) {
    var messages = fs.readFileSync(config.logFile, 'utf8').split('\n');

    res.render('index', {
      title: 'IRC Snooper',
      messages: messages
    });

    console.log('Accessed');
  }
};
