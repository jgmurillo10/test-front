var express = require('express');
var router = express.Router();
var products = require('../public/data/products.json');
products.forEach(p=>{
  p.price = Number(p.price.replace("$","").replace(",",""));
})
function sortByKey(array, key,parseNumber){

  console.log(parseNumber)
  return array.sort(function(a, b) {
    var x,y;
    x = a[key];
    y = b[key];

    if(parseNumber){
      x = Number(a[key].replace("$","").replace(",",""));
      y = Number(b[key].replace("$","").replace(",",""));
      console.log(x,y)
    }
    if(typeof x === 'string'){
      x = x.toLowerCase();
      y = y.toLowerCase();
    }
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    
  });
}
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
router.get('/sublevel/:id_sublevel/available',function(req,res,next) {
  let response = [];
  products.forEach(p=>{
    if (p.sublevel_id==req.params.id_sublevel) {
      if (p.available) {
        response.push(p);
      }
    }
  })

  res.json(response);
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
router.get('/sublevel/:id_sublevel/stats/max',function(req,res,next) {

  let res_array = [];
  products.forEach(p => {
    if(p.sublevel_id == req.params.id_sublevel) {
        res_array.push(p)
    }
  })

  let max = res_array[0];
  res_array.forEach((p)=>{
    if(p[req.query.attribute]>max[req.query.attribute]){
      max=p;
    }
  })

  res.json(max);
});
router.get('/sublevel/:id_sublevel/stats/min',function(req,res,next) {
  let res_array = [];
  products.forEach(p => {
    if(p.sublevel_id == req.params.id_sublevel) {
        res_array.push(p)
    }
  })

  let min = res_array[0];
  res_array.forEach((p)=>{
    if(p[req.query.attribute]<min[req.query.attribute]){
      min=p;
    }
  })

  res.json(min);
});
router.get('/sublevel/:id/order', function(req,res,next) {
  let res_array = [];
  products.forEach(p => {
    if(p.sublevel_id == req.params.id) {
      res_array.push(p)
  }
  })
  console.log(res_array)
  let sorted = sortByKey(res_array,req.query.by,req.query.parseNumber);
  if(req.query.desc == "true"){
    res.json(sorted.reverse());
  }
  else{
    res.json(sorted);  
  }
});
router.get('/able',function(req,res,next) {
  console.log('products/available')
  let availableProducts = products.filter((d) => {
        return d.available == true
      })
  console.log(availableProducts)
  res.json(products);
});
router.get('/available', function(req, res, next) {
  // Comment out this line:
  //res.send('respond with a resource');

  // And insert something like this instead:
  console.log('products/available')
  let availableProducts = products.filter((d) => {
        return d.available === true
      })
  console.log(availableProducts)
  res.json(products);
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