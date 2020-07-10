// Script for training the classifier

var natural = require('natural');

var classifier = new natural.BayesClassifier();

natural.BayesClassifier.load('classifier.json', null, function(err, classifier) {
});

classifier.addDocument('where are the beans', 'where');
classifier.addDocument('tell me where the chocolate is', 'where');
classifier.addDocument('i am looking for bread', 'where');

classifier.addDocument('hello', 'hello');
classifier.addDocument('hi', 'hello');
classifier.addDocument('howdy', 'hello');

classifier.addDocument('start', 'start');
classifier.addDocument('let\'s start', 'start');
classifier.addDocument('start over', 'start');

classifier.addDocument('actions', 'actions');

classifier.addDocument('call for assistance', 'help');
classifier.addDocument('help', 'help');

classifier.addDocument('exit', 'exit');
classifier.addDocument('stop', 'exit');
classifier.addDocument('done', 'exit');

classifier.addDocument('print', 'print');
classifier.addDocument('map', 'print');
classifier.addDocument('print this map', 'print');

classifier.addDocument('ask a question', 'question');
classifier.addDocument('I\'m looking for something', 'question');
classifier.addDocument('another question', 'question');

classifier.addDocument('droids', 'droids');

classifier.train();

console.log(classifier.classify('where is the sugar'));
console.log(classifier.classify('can you tell me where ice cream is'));
console.log(classifier.classify('hello'));
console.log(classifier.classify('actions'));
console.log(classifier.classify('let\'s start'));
console.log(classifier.classify('call for assistance'));
console.log(classifier.classify('done'));
console.log(classifier.classify('print this map'));
console.log(classifier.classify('another question'));
console.log(classifier.classify('droids'));

var output = classifier.classify('where is the sugar');

classifier.save('classifier.json', function(err, classifier) {
});