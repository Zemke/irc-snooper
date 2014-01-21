var irc = require('irc');
var fs = require('fs');

var SERVER = 'irc.gamesurge.net';
var USERNAME = 'SnooperBot';
var CHANNELS = ['#irc-worms-snooper'];
var LOG_FILE = 'snooped.log';
var HELLO = 'Hey, I’m a roboter. 24 hours a day, seven days a week, I log all the messages of this channel and direct them to a website for everyone to read them.';
var WEBSITE = 'http://irc-worms-snooper.herokuapp.com/snooped.log';

var client = new irc.Client(SERVER, USERNAME, {
  channels: CHANNELS
});

/**
 * Log messages in the channel to a file.
 */
client.addListener('message', function (from, to, message) {
  fs.appendFile(LOG_FILE, formatMessage(from, message), function (err) {
    if (err) {
      console.log(err);
    }
  });
});

/**
 * Send an information message upon private notifications.
 */
client.addListener('pm', function (from, message) {
    client.say(from, HELLO);
    client.say(from, WEBSITE);
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