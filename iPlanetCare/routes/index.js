const express = require('express'),
    router = express.Router(),
    Devices = require('../schema/Devices'),
    Cart = require('../modules/cart'),
    Client = require('../schema/Client'),
    Shop = require('../schema/Products'),
    moment = require('moment'),
    schedule = require('node-schedule');


let progress = [];

router.get('/', (req, res, next) => {
    Devices.find({}, (err, device) => {
        if (err) {
            console.log(err);
        } else {
            let cookie = new Cart(req.session.cart ? req.session.cart :{items:{}});
            console.log(cookie);
                    Shop.find().sort('-created').limit(10).exec((err, product) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.render('landing', {product,cookie:cookie.generateArray(),total:cookie});
                        }
                    })

                }
            });
});

router.get('/search', (req, res) => {
    let search = req.query.q;
    Shop.find().or([{
        model: {
            $regex: new RegExp(escape(search)),
            '$options': 'i'
        }
    }, {
        imei: {
            $regex: new RegExp(escape(search)),
            '$options': 'i'
        }
    }, {
        manufacturer: {
            $regex: new RegExp(escape(search)),
            '$options': 'i'
        }
    }, {
        type: {
            $regex: new RegExp(escape(search)),
            '$options': 'i'
        }
    }, {
        name: {
            $regex: new RegExp(escape(search)),
            '$options': 'i'
        }
    },
        {
            cpu: {
                $regex: new RegExp(escape(search)),
                '$options': 'i'
            }
        }, {
            ram: {
                $regex: new RegExp(escape(search)),
                '$options': 'i'
            }
        }, {
            model: {
                $regex: new RegExp(escape(search)),
                '$options': 'i'
            }
        }, {
            size: {
                $regex: new RegExp(escape(search)),
                '$options': 'i'
            }
        }, {
            graphics: {
                $regex: new RegExp(escape(search)),
                '$options': 'i'
            }
        },
    ]).limit(10).exec((err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json(result)
        }
    });
});

router.get('/add-to-cart/:id',(req,res)=>{
  let cart = new Cart(req.session.cart ? req.session.cart : {});
  Shop.findById(req.params.id, async (err, product) => {
      if (err) {
          console.log(err);
      } else {
          cart.add(product, product.id);
          req.session.cart = cart;
          req.session.save((err)=> {
              res.redirect('back');
          })
      }
  })
});

router.get('/remove-from-cart/:id',(req,res)=>{
    let cart = new Cart(req.session.cart);
    Shop.findById(req.params.id,(err,product)=> {
        if (err) {
            console.log(err);
        } else {
            cart.remove(product, product.id);
            req.session.cart = cart;
            req.session.save((err)=> {
                res.redirect('back');
            })
        }
    });
});

router.get('/cart/',(req,res)=>{
    if(!req.session.cart){
        return res.render('shop/cart',{product:null});
    }
    let cookie = new Cart(req.session.cart);
    res.render('shop/cart',{cookie:cookie.generateArray(),total:cookie} )
});

module.exports = router;
