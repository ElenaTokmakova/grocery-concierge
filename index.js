const express = require('express');
const app = express();

app.use(express.static(__dirname + '/views')); // html
app.use(express.static(__dirname + '/public')); // js, css, images

const server = app.listen(5000);
app.get('/', (req, res) => {
  res.sendFile('index.html');
});


var documents = [{
  "name": "beans",
  "location" : "Aisle 3"
}, {
  "name": "toilet paper",
  "location": "Aisle 5"
}, {
  "name": "kraft macaroni and cheese",
  "location": "Aisle 7"
}];

const lunr = require('lunr');

var idx = lunr(function () {
  this.ref('name')
  this.field('name')

  documents.forEach(function (doc) {
    this.add(doc)
  }, this)
})

const io = require('socket.io')(server);
io.on('connection', function(socket){
  console.log('client connected');
});

io.on('connection', function(socket) {
  socket.on('customer query', (text) => {
    console.log('Message: ' + text);

    // TODO search for item requested
    var results = idx.search("beans");

    socket.emit('response', { reply: 'You can find that in aisle 3', info: 'Aisle 3'});
  });
});
