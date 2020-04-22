const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const socketIo = require("socket.io");
const lunr = require('lunr');
const routes = require('./routes');
const documents = require('./data/default');

const app = express();

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

    // TODO search for item requested
    const results = idx.search("beans");

    // send search result to client
    socket.emit('response', { reply: 'You can find that in aisle 3', info: 'Aisle 3'});
  });
});
