var config = require('./../config/config');
var irc = require('irc');
var fs = require('fs');

module.exports = function (server) {
  var io = require('socket.io').listen(server);

  /**
   * Initializing the client, joining the server and channel.
   */
  var client = new irc.Client(config.server, config.username, {
    channels: [config.channels]
  });

  /**
   * Log messages in the channel to a file.
   */
  client.addListener('message', function (from, to, message) {
    fs.appendFile(config.logFile, formatMessage(from, message), function (err) {
      if (err) {
        console.error(err);
      }
    });

    io.sockets.on('connection', function (socket) {
      socket.on('another', function (data) {
        socket.emit('news', { message: data });
      });
    });
  });

  /**
   * Send an information message upon private notifications.
   */
  client.addListener('pm', function (from, message) {
      client.say(from, config.helloMessage);
      client.say(from, config.tellAboutContribution);
      client.say(from, config.website);
      console.log('Private message received from ' + from);
  });

  /**
   * Return a nice message string.
   *
   * @param from The sender of the received message.
   * @param message The message that was received.
   * @returns {string} HH:ii:ss Nickname: Message that was received.
   */
  var formatMessage = function (from, message) {
    var date = new Date();
    var timestamp = prependZero(date.getUTCHours()) + ':';
    timestamp += prependZero(date.getUTCMinutes()) + ':';
    timestamp += prependZero(date.getUTCSeconds());
    return timestamp + ' ' + from + ': ' + message + '\n';
  };

  /**
   * Add leading zero if number is less than 10.
   *
   * @param number The number to fill prepend with a zero.
   * @returns {string} New number with leading zero.
   */
  var prependZero = function (number) {
    return +number < 10 ? '0' + number : number;
  };
};
