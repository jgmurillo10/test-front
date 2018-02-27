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
router.get('/:id', function(req, res, next) {
  // Comment out this line:
  //res.send('respond with a resource');
  let product;
  // And insert something like this instead:
    products.forEach(p => {
    if(p.id === req.params.id) {
      product=p;
    }

  })
  res.json(product);
});
router.get('/sublevel/:id_sublevel', function(req, res, next) {
  // Comment out this line:
  //res.send('respond with a resource');
  let resP = [];
  // And insert something like this instead:
    products.forEach(p => {
    if(p.sublevel_id == req.params.id_sublevel) {
      if(req.query.min_price && req.query.max_price ){
        console.log('yes')
        let price = Number(p.price.replace("$","").replace(",",""));
        if(price>=req.query.min_price && price<=req.query.max_price){
          
          if(req.query.min_quantity && req.query.max_quantity){
            let quantity = p.quantity;
            if(quantity>=req.query.min_quantity && quantity<=req.query.max_quantity){
              resP.push(p);
            }
          }else{
            resP.push(p);
          }
        }
      }
      else{
        resP.push(p);  
      }
      
    }
  })

  res.json(resP);
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