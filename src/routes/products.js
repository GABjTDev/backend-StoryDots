const express = require('express');
const productSchema = require('../models/ProductsModel');
const router = express.Router();

// create product
router.post('/product', (req, res) => {
    const user = productSchema(req.body);

    if(req.body.name === "") res.json({
        message: "Campo name vacio",
        error: true
    })

    if(req.body.description === "") res.json({
        message: "Campo description vacio",
        error: true
    })

    if(req.body.price === "") res.json({
        message: "Campo Precio vacio",
        error: true
    })

    user.save()
        .then((data) => {
            res.json({
                message: 'Producto creado',
                data
            })
        })
        .catch(err => res.json({
            message: err
        }))
});


// get all products
router.get('/products', (req, res) => {
    productSchema.find()
        .then((data) => {
            res.json({
                message: 'Todo los productos',
                data
            })
        })
        .catch(err => res.json({
            message: err
        }))
});

// get 8 products
router.get('/products/:page', (req, res) => {
    let page = Number(req.params.page);
    let skip = (page === 0) ? 0 : 8;
    
    productSchema.find().limit(8).skip(page * skip)
        .then((data) => {
            res.json({
                message: `Lista de productos pagina ${page}`,
                data
            })
        })
        .catch(err => res.json({
            message: err
        }))
});

// get a product
router.get('/product/:id', (req, res) => {
    const {id} = req.params;

    productSchema.findById(id)
        .then((data) => {
            res.json({
                message: 'Producto buscado',
                data
            })
        })
        .catch(err => res.json({
            message: err
        }))
});

// update a product
router.put('/product/:id', (req, res) => {
    const {id} = req.params;
    const {name, description, image_url, price} = req.body;

    productSchema.updateOne({_id: id}, {$set: {name, description, image_url, price}})
        .then((data) => {
            
            res.json({
                message: 'Producto editado',
                data
            })
        })
        .catch(err => {
            res.json(err)
        })
});

// delete a product
router.delete('/product/:id', (req, res) => {
    const {id} = req.params;

    productSchema.deleteOne({_id: id})
        .then((data) => {
            res.json({
                message: 'Producto eliminado',
                data
            })
        })
        .catch(err => res.json({
            message: err
        }))
});

module.exports = router;