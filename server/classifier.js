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

classifier.train();

console.log(classifier.classify('where is the sugar'));
console.log(classifier.classify('can you tell me where ice cream is'));
console.log(classifier.classify('hello'));

var output = classifier.classify('where is the sugar');

classifier.save('classifier.json', function(err, classifier) {
});