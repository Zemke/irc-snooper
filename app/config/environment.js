var path = require('path');

module.exports = function (app, express, port) {
  app.configure(function () {
    app.set('views', path.join(__dirname, '../public/views'));
    app.set('view engine', 'jade');
    app.set('port', port);
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(express.favicon());
  });
};