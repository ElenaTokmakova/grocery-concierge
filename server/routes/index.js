const router = require('express').Router();
const path = require('path');
const helpers = require('../helpers');

// routes will be called first and, if no middleware handles the request, then express will call static files
// return default (mock) product location data
router.get('/default', (req, res) => {
  console.log("Default data route");
  const data = helpers.readJsonFileSync('../data/default.json');
  res.json(data)
});

// the path redirects users to the public/index.html to the React application
router.get('*', (req, res) => {
  console.log("Load static file route");
  const route = path.join(__dirname, '..', '..', 'public', 'index.html');
  res.sendFile(route);
});

module.exports = router;