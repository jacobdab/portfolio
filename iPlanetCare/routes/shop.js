const express = require('express'),
    router = express.Router(),
    Shop = require('../schema/Products'),
    CategoryMenu = require('../schema/CategoryMenu'),
    Parameters = require('../schema/Parameters'),
    SubCategoryMenu = require('../schema/SubCategoryMenu'),
    middlewareObject = require('../middleware/index'),
    Cart = require('../modules/cart'),
    async = require('async'),
    moment = require('moment'),
    jquery = require('jquery');


router.get('/', (req, res) => {
    let cookie = new Cart(req.session.cart);
    console.log(cookie);
    CategoryMenu.find().exec((err, productItems) => {
        if (err) {
            console.log(err);
        } else {
            res.render('shop/index', {productItems,cookie:cookie.generateArray(),total:cookie})
        }
    });
});

router.get('/addCategory', middlewareObject.checkPermission, (req, res) => {
    let cookie = new Cart(req.session.cart);
    res.render('shop/addCategory',{cookie:cookie.generateArray(),total:cookie});
});
router.post('/addCategory', middlewareObject.checkPermission, (req, res) => {
    let parsed = {category: req.body.category, imageTH: req.body.imageTH};
    CategoryMenu.create(parsed, (err, category) => {
        if (err) {
            console.log(err);
        } else {
            console.log(category);
            res.redirect('/shop');
        }
    });
});
router.get('/addProduct', middlewareObject.checkPermission, (req, res) => {
    let cookie = new Cart(req.session.cart);
    CategoryMenu.find({}).exec((err, category) => {
        if (err) {
            console.log(err)
        } else {
            SubCategoryMenu.find({}).exec((err, subCategory) => {
                res.render('shop/addProduct', {category, subCategory,cookie:cookie.generateArray(),total:cookie});
            })
        }
    });

});
router.get('/:category_id', (req, res) => {
    let cookie = new Cart(req.session.cart);
    CategoryMenu.find({category: req.params.category_id}).populate('subCategory').exec((err, categories) => {
        if (err) {
            console.log(err)
        } else {
            console.log(categories);
            res.render('shop/subcategory', {categories,cookie:cookie.generateArray(),total:cookie});
        }
    });
    router.get('/:category_id/addSubCategory', middlewareObject.checkPermission, (req, res) => {
        let id = req.params.category_id
        res.render('shop/addSubCategory', {id,cookie:cookie.generateArray(),total:cookie});
    });
    router.post('/:category_id/addSubCategory', middlewareObject.checkPermission, (req, res) => {
        CategoryMenu.find({category: req.params.category_id}).exec((err, category) => {
            if (err) {
                console.log(err);
            } else {
                let parsed = {subCategory: req.body.subCategory, imageTH: req.body.imageTH}
                SubCategoryMenu.create(parsed, (err, subCategoryItem) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(category);
                        console.log(subCategoryItem);
                        category[0].subCategory.push(subCategoryItem);
                        category[0].save();
                        res.redirect('/shop/' + req.params.category_id);
                    }
                });
            }
        });
    });

    router.get('/:category_id/:subCategory_id', (req, res) => {
        res.charset = 'utf-8';
        let cookie = new Cart(req.session.cart);
        Shop.find({subCategory: req.params.subCategory_id}).exec((err, products) => {
            if (err) {
                console.log(err)
            } else {
                let color = removeDuplicates(products, 'color');
                let ram = removeDuplicates(products, 'ram');
                let hdd = removeDuplicates(products, 'hdd');
                let conn = removeDuplicates(products, 'connection');
                let size = removeDuplicates(products, 'size');
                let cpu = removeDuplicates(products, 'cpu');
                let cpuSpeed = removeDuplicates(products, 'cpuSpeed');
                let caseW = removeDuplicates(products, 'caseW');
                let colorBands = removeDuplicates(products, 'colorBands');
                let colorCount = CountIt(color, 'color');
                let ramCount = CountIt(ram, 'ram');
                let hddCount = CountIt(hdd, 'hdd');
                let connCount = CountIt(conn, 'connection');
                let sizeCount = CountIt(conn, 'size');
                let cpuCount = CountIt(conn, 'cpu');
                let cpuSpeedCount = CountIt(conn, 'cpuSpeed');
                let caseWCount = CountIt(conn, 'caseW');
                let colorBandsCount = CountIt(conn, 'colorBands');
                Parameters.find().sort({"hdd": -1}).exec((err, parameters) => {
                    if (err) {
                        console.log(err)
                    } else {
                        if (req.query.f != undefined) {
                            let filter = req.query.f;
                            if (Array.isArray(req.query.f)) {
                                let query = {
                                    '$or': []
                                };
                                let countEach = 0;
                                let filtered = [];
                                console.log(req.query.f);
                                let keys = []
                                filter.forEach(async (filterE, i) => {
                                    let forJson = filterE.replace('[', '\":\"').replace(']', "\"");
                                    let formatedJson = '{"' + forJson + '}';
                                    let ultraFormatedJson = JSON.parse(formatedJson);
                                    await filtered.push(ultraFormatedJson);
                                    keys.push(Object.keys(filtered[i]));
                                    console.log(keys[i][0]);
                                    console.log(filtered[i][keys[i][0]]);
                                    query['$or'].push({[keys[i][0]]: filtered[i][keys[i][0]]})
                                    //query.$and([{color: filtered[0].color,subCategory:req.params.subCategory_id}]);
                                    countEach++;

                                    if (countEach == filter.length) {
                                        console.log(query);
                                        Shop.find(query).exec((err, products) => {
                                            if (err) {
                                                console.log(err)
                                            } else {
                                                console.log(products);
                                                res.render('shop/products', {
                                                    color,
                                                    colorCount,
                                                    ram,
                                                    ramCount,
                                                    hdd,
                                                    hddCount,
                                                    conn,
                                                    connCount,
                                                    size,
                                                    sizeCount,
                                                    cpu,
                                                    cpuCount,
                                                    cpuSpeed,
                                                    cpuSpeedCount,
                                                    caseW,
                                                    caseWCount,
                                                    colorBands,
                                                    colorBandsCount,
                                                    products,
                                                    cookie:cookie.generateArray(),
                                                    total:cookie,
                                                    BreadCrumb: {
                                                        category: req.params.category_id,
                                                        subCategory: req.params.subCategory_id,
                                                    },
                                                    parameters
                                                });
                                            }
                                        });
                                    }
                                });
                            } else {
                                console.log(req.query.f);
                                let forJson = filter.replace('[', '\":\"').replace(']', "\"");
                                console.log(forJson);
                                let formatedJson = '{"' + forJson + '}';
                                console.log(formatedJson + ' formatedJson');
                                let ultraFormatedJson = JSON.parse(formatedJson);
                                console.log(ultraFormatedJson + ' ultraJson');
                                Shop.find(ultraFormatedJson).exec((err, products) => {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        console.log(products);
                                        res.render('shop/products', {
                                            color,
                                            colorCount,
                                            ram,
                                            ramCount,
                                            hdd,
                                            hddCount,
                                            conn,
                                            connCount,
                                            size,
                                            sizeCount,
                                            cpu,
                                            cpuCount,
                                            cpuSpeed,
                                            cpuSpeedCount,
                                            caseW,
                                            caseWCount,
                                            colorBands,
                                            colorBandsCount,
                                            products,
                                            cookie:cookie.generateArray(),
                                            total:cookie,
                                            BreadCrumb: {
                                                category: req.params.category_id,
                                                subCategory: req.params.subCategory_id,
                                            },
                                            parameters
                                        });
                                    }
                                })
                            }
                            ;
                        } else {
                            console.log(colorCount);
                            res.render('shop/products', {
                                color,
                                colorCount,
                                ram,
                                ramCount,
                                hdd,
                                hddCount,
                                conn,
                                connCount,
                                size,
                                sizeCount,
                                cpu,
                                cpuCount,
                                cpuSpeed,
                                cpuSpeedCount,
                                caseW,
                                caseWCount,
                                colorBands,
                                colorBandsCount,
                                products,
                                total:cookie,
                                cookie:cookie.generateArray(),
                                BreadCrumb: {
                                    category: req.params.category_id,
                                    subCategory: req.params.subCategory_id,
                                },
                                parameters
                            });
                        }

                    }
                });
            }
        })
    });


    router.get('/:category:id/:subCategory_id/:product_id/', (req, res) => {
        let cookie = new Cart(req.session.cart);
        Shop.find({_id: req.params.product_id}, (err, product) => {
            if (err) {
                console.log(err);
            } else {
                res.render('shop/showProduct', {product,cookie:cookie.generateArray(),total:cookie});
            }
        });

    });
});


router.delete('/:category_id/', middlewareObject.checkPermission, (req, res) => {
    CategoryMenu.findByIdAndRemove(req.params.category_id, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/shop');
        }
    })
});
router.delete('/:category_id/:subCategory_id/:product_id', middlewareObject.checkPermission, (req, res) => {
    Shop.findByIdAndRemove(req.params.product_id, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/shop/' + req.params.category_id + '/' + req.params.subCategory_id + '/');
        }
    })
});


function removeDuplicates(json_all, jsonValue) {
    var names_array_new = json_all.reduceRight(function (r, a) {
        r.some(function (b) {
            return a[jsonValue] === b[jsonValue];
        }) || r.push(a);
        return r;
    }, []);

    return names_array_new
}

function CountIt(json_withoutDup, jsonKey) {
    let counter = [];
    json_withoutDup.forEach(productE => {
        Shop.count({[jsonKey]: productE[jsonKey]}, (err, count) => {
            if (err) {
                console.log(err)
            } else {
                counter.push(count);
            }
        });
    });
    return counter;
}

router.get('/admin', middlewareObject.checkPermission, (req, res) => {
    let cookie = new Cart(req.session.cart);
    Shop.find().limit(10).exec((err, product) => {
        if (err) {
            console.log(err);
        } else {
            res.render('shop/admin', {product,cookie:cookie.generateArray(),total:cookie});
        }
    });
});


router.get('/:product_id/edit', middlewareObject.checkPermission, (req, res) => {
    let cookie = new Cart(req.session.cart);
    Shop.findById(req.params.product_id, (err, product) => {
        if (err) {
            console.log(err);
        } else {
            res.render('shop/editProduct', {product,cookie:cookie.generateArray(),total:cookie});
        }
    });

});

router.post('/addProduct', middlewareObject.checkPermission, (req, res) => {
    let productDB = {
        manufacturer: req.body.manufacturer,
        shortDescription: req.body.shortDescription,
        model: req.body.model,
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        subCategory: req.body.subCategory,
        imageHR: req.body.imageHR,
        quantity: req.body.quantity,
        price: req.body.price,
        hdd: req.body.hdd,
        res: req.body.res,
        size: req.body.size,
        connection: req.body.conn,
        color: req.body.color,
        caseW: req.body.caseW,
        colorBands: req.body.colorBands,
    };

    Shop.create(productDB, (err, product) => {
        if (err) {
            console.log(err);
            req.flash('err', err.message);
        } else {

            console.log(product);
            req.flash('success', 'Produkt dodany');
            var backURL = req.header('Referer') || '/';
            res.redirect('/shop');
        }
    });
});
router.post('/addParametr', middlewareObject.checkPermission, (req, res) => {
    let productDB = {
        hdd: req.body.hdd,
        size: req.body.size,
        res: req.body.res,
        color: req.body.color,
        ram: req.body.ram,
        conn: req.body.conn,
        caseW: req.body.caseW,
        colorBands: req.body.colorBands,
    }
    console.log(productDB);
    Parameters.create(productDB, (err, parametr) => {
        if (err) {
            console.log(err);
            req.flash('err', err.message);
        } else {
            console.log(parametr);
            req.flash('success', 'Parametr dodany');
        }
    });
});


router.put('/:product_id/edit', middlewareObject.checkPermission, (req, res) => {
    let parsed = {
        manufacturer: req.body.manufacturer,
        shortDescription: req.body.shortDescription,
        model: req.body.model,
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        imageHR: req.body.imageHR,
        quantity: req.body.quantity,
        price: req.body.price
    };
    Shop.findByIdAndUpdate(req.params.product_id, parsed, (err, product) => {
        if (err) {
            console.log(err);
            req.flash('err', err.message)
        } else {
            console.log(product);
            req.flash('success', 'Produkt zaaktualizowany')
            res.redirect('/');
        }
    });
});


module.exports = router;
