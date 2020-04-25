const express = require('express');
const app = express();

var natural = require('natural');
var classifier = new natural.BayesClassifier();

natural.BayesClassifier.load('classifier.json', null, function(err, c) {
  classifier = c;
});

app.use(express.static(__dirname + '/views')); // html
app.use(express.static(__dirname + '/public')); // js, css, images

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

// TODO read from a json file
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

    // Determine intent of utterance
    var classification = classifier.classify(text);

    if (classification == 'where') {
      // Filter question to get the search item
      var tokens = natural.PorterStemmer.tokenizeAndStem(text);

      var searchItem = '';
      tokens.forEach(function (token, index) {
        console.log(token);
        searchItem += token + ' ';
      });

      // Search for the item in the index
      var results = idx.search(searchItem);
  
      if (results.length > 0) {
        let found = documents.find(e => e.name === results[0].ref);
        console.log('Message: ' + found.location);
        socket.emit('response', { reply: 'You can find that in ' + found.location, info: found.location});
      } else {
        socket.emit('response', { reply: 'Sorry, I can\'t find what you\'re looking for, please try again', info: 'Please try again'});
      }  
    } else if (classification == 'hello') {
      socket.emit('response', { reply: 'Hi!', info: 'Hi!'});
    }
    
  });
});