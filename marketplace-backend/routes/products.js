var express = require('express');
var router = express.Router();
var products = require('../public/data/products.json');

/* GET users listing. */
router.get('/', function(req, res, next) {
	// Comment out this line:
  //res.send('respond with a resource');

  // And insert something like this instead:
  res.json(products);
});
router.get('/available', function(req, res, next) {
  // Comment out this line:
  //res.send('respond with a resource');

  // And insert something like this instead:
  let availableProducts = products.filter((d) => {
        return d.available === true
      })
  res.json(availableProducts);
});
router.get('/min/price', function(req,res,next) {

  let min = products[0];
  products.forEach((p)=>{
    if(p.price<min.price){
      min=p;
    }
  })

  res.json(min);
})
router.get('/max/price', function(req,res,next) {

  let min = products[0];
  products.forEach((p)=>{
    if(p.price>min.price){
      min=p;
    }
  })

  res.json(min);
})
router.get('/min/quantity', function(req,res,next) {

  let min = products[0];
  products.forEach((p)=>{
    if(p.quantity<min.quantity){
      min=p;
    }
  })

  res.json(min);
})
router.get('/max/quantity', function(req,res,next) {

  let min = products[0];
  products.forEach((p)=>{
    if(p.quantity>min.quantity){
      min=p;
    }
  })

  res.json(min);
})

module.exports = router;