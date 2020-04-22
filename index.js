const express = require('express');
const app = express();

app.use(express.static(__dirname + '/views')); // html
app.use(express.static(__dirname + '/public')); // js, css, images

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

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

    // TODO parse the incoming text
    var searchItem = text;

    // TODO search for item requested
    var results = idx.search(searchItem);

    if (results.length > 0) {
      let found = documents.find(e => e.name === results[0].ref);
      console.log('Message: ' + found.location);
      socket.emit('response', { reply: 'You can find that in ' + found.location, info: found.location});
    } else {
      socket.emit('response', { reply: 'Sorry, I can\'t find what you\'re looking for, please try again', info: 'Please try again'});
    }
    
  });
});

app.get('/test', function (req, res) {

  var results = idx.search("macaroni and cheese");
  
  if (results.length > 0) {
    let found = documents.find(e => e.name === results[0].ref);
    console.log('Message: ' + found.location);
  }

  res.send('hello world')
})