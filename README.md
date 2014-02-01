IRC Snooper
===========

A bot for IRC that will log all the messages of an IRC channel and display them on a web page.

Installation
------------

1. Edit `config.js.default` in `app/config` according to your needs and save as `config.js`.
2. From the root directory run `foreman start`.

Deployment
----------

Deploying with Heroku is as easy as it could be—and it’s free. [Here](https://devcenter.heroku.com/articles/git) is the documentation.

Heroku automatically idles apps after one hour without request. This would eventually kick the IRC bot from the channel. Here is a script that will ping the app every 30 minutes to keep it alive. Don’t forget to change the host. You can just append this to `app/app.js`.

```javascript
setInterval(function () {
  var options = {
    host: 'example.com',
    port: 80,
    path: '/'
  };

  http.get(options, function(res) {
    res.on('data', function(chunk) {
      console.log('Keep dyno alive response size: ' + chunk.length);
    });
  }).on('error', function(err) {
    console.error(err);
  });
}, 1800000); // Every 30 minutes.
```
