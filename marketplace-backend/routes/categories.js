var express = require('express');
var router = express.Router();
var categories = require('../public/data/categories.json');

/* GET users listing. */
router.get('/', function(req, res, next) {
	// Comment out this line:
  //res.send('respond with a resource');

  // And insert something like this instead:
  res.json(categories);
});

module.exports = router;