var fs = require('fs');
var config = require('./config/config');

fs.exists(config.logFile, function(exists) {
  if (!exists) {
    fs.writeFileSync(config.logFile, '\n');
  }
});

var express = require('express');
var app = express();
var port = Number(process.env.PORT || 5000);

var environment = require('./config/environment')(app, express, port);
var controller = require('./controller');
var routes = require('./config/routes')(app);
var snooper = require('./util/snooper')();

app.listen(port, function() {
  console.log('Listening on port ' + port);
});
