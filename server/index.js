const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const socketIo = require("socket.io");
const lunr = require('lunr');
const natural = require('natural');
const routes = require('./routes');
const documents = require('./data/mapping');

const app = express();

const PORT = process.env.PORT || 3000;
const ENVIRONMENT = process.env.NODE_ENV || 'development';

let classifier = new natural.BayesClassifier();

// use cors to allow cross origin resource sharing on localhost
if (ENVIRONMENT === 'development') {
    const cors = require('cors');
    app.use(cors());
    natural.BayesClassifier.load('classifier.json', null, function(err, c) {
      classifier = c;
    });
} else {
    natural.BayesClassifier.load('server//classifier.json', null, function(err, c) {
      classifier = c;
    });
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
  this.ref('name');
  this.field('name');
  this.field('category');

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

    console.log('Classification', classification)

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
        socket.emit('response', { type: 'where', term: searchItem, reply: 'You can find ' + found.category + ' in ' + found.location, name: found.name, info: found.location});
      } else {
        socket.emit('response', { type: 'not-found', reply: 'Sorry, I can\'t find what you\'re looking for, please try again'});
      }
    } else if (classification == 'hello') {
      socket.emit('response', { type: 'hello', reply: 'Hi!'});
    } else if (classification == 'exit') {
      socket.emit('response', { type: 'exit', reply: 'The application will close automatically in 5 minutes. Say "start over" if you want to begin a new session.'});
    } else if (classification == 'print') {
      socket.emit('response', { type: 'print', reply: 'Printing the map'});
    } else if (classification == 'help') {
      socket.emit('response', { type: 'help', reply: 'An assistant will be with you shortly'});
    } else if (classification == 'question') {
      socket.emit('response', { type: 'question', reply: 'What are you looking for?'});
    } else if (classification == 'start') {
      socket.emit('response', { type: 'start', reply: 'Say "Ask a question" to continue.'});
    } else if (classification == 'actions') {
      socket.emit('response', { type: 'actions', reply: 'Please select what you would like to do'});
    } else if (classification == 'droids') {
      socket.emit('response', { type: 'droids', reply: 'I can\'t find the droids you are looking for'});
    }
  });
});
