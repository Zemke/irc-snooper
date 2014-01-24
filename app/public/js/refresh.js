var socket = io.connect(document.URL);

socket.on('news', function (data) {
  console.log(data);
});