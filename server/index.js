const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const socketIo = require("socket.io");
const lunr = require('lunr');
const routes = require('./routes');
const documents = require('./data/mapping');

const app = express();

const natural = require('natural');
let classifier = new natural.BayesClassifier();

natural.BayesClassifier.load('classifier.json', null, function(err, c) {
  classifier = c;
});

const PORT = process.env.PORT || 3000;
const ENVIRONMENT = process.env.NODE_ENV || 'development';

// use cors to allow cross origin resource sharing on localhost
if (ENVIRONMENT === 'development') {
    const cors = require('cors');
    app.use(cors());
 }

// Point static path to the public folder
app.use('/', express.static(path.join(__dirname, '..', 'public')));
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

app.use('/', routes);

// express.json() and express.urlencoded() for
// POST and PUT requests to process request body (future use)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const server = app.listen(PORT, () => {
    console.log(`Our cors enabled server is listening on port ${ PORT }`);
});

const idx = lunr(function () {
  this.ref('name')
  this.field('name')

  documents.forEach(function (doc) {
    this.add(doc)
  }, this)
})

// attach socket.io to an Express server listening on port 3000
const io = socketIo(server);
io.on('connection', function(socket) {
  console.log('Client connected');
  socket.on('customer query', (text) => {
    console.log('Message: ' + text);

    // Determine intent of utterance
    const classification = classifier.classify(text);

    if (classification == 'where') {
      // Filter question to get the search item
      const tokens = natural.PorterStemmer.tokenizeAndStem(text);

      let searchItem = '';
      tokens.forEach(function (token, index) {
        console.log(token);
        searchItem += token + ' ';
      });

      // send search result to client
      // Search for the item in the index
      var results = idx.search(searchItem);

      if (results.length > 0) {
        let found = documents.find(e => e.name === results[0].ref);
        console.log('Message: ' + found.location);
        socket.emit('response', { type: 'where', term: searchItem, reply: 'You can find that in ' + found.location, location: found.location, info: found.location});
      } else {
        socket.emit('response', { type: 'not-found', reply: 'Sorry, I can\'t find what you\'re looking for, please try again', info: 'Please try again'});
      }
    } else if (classification == 'hello') {
      socket.emit('response', { type: 'hello', reply: 'Hi!', info: 'Hi!'});
    }
  });
});
