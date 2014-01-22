var config = require('./config');
var irc = require('irc');
var fs = require('fs');

var client = new irc.Client(config.server, config.username, {
  channels: config.channels
});

/**
 * Log messages in the channel to a file.
 */
client.addListener('message', function (from, to, message) {
  fs.appendFile(config.logFile, formatMessage(from, message), function (err) {
    if (err) {
      fs.appendFile(config.errorLogFile, err);
    }
  });
});

/**
 * Send an information message upon private notifications.
 */
client.addListener('pm', function (from, message) {
    client.say(from, config.helloMessage);
    client.say(from, config.website);
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