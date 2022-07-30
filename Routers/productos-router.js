const express = require('express')
const router = express.Router()
const Products = require('../Clases/products')

const products = new Products('products.json')

router.get('/', (req,res)=>{
    try {
        const data = products.getAll()
        res.json(data)
    } catch (error) {
        console.log(error);
    }
})

router.get('/:id',(req,res)=>{
    try {
        const product = products.getById(req.params.id)
        if (!product) {
            res.json({Error: "No se encontró ningún producto que contenga dicho ID."})
        } else {
            res.json(product)
        }

    } catch (error) {
        console.log(error);
    }
})

router.post('/',(req,res)=>{
    try {
        products.save(req.body)
        res.json(req.body)
    } catch (error) {
        console.log(error);
    }
})

router.put('/:id',(req,res)=>{
    try {
        const previousProduct = products.getById(req.params.id)
        if (!products) {
            res.json({Error: "No se encontró ningún producto que contenga dicho ID."})
        } else {
            const updatedProduct = {
                id: previousProduct.id,
                timestamp:Date.now(),
                name:req.body.name,
                description:req.body.description,
                code:req.body.code,
                url:req.body.url,
                price:req.body.price,
                stock:req.body.stock
            }
            products.update(updatedProduct)
            res.json({Exito: "Actualización realizada correctamente."})
        }
    } catch (error) {
        
    }
})

router.delete('/:id',(req,res)=>{
    try {
        const removedProduct = products.getById(req.params.id)
        if (!removedProduct) {
            res.json({Error: "No se encontró ningún producto que contenga dicho ID."})
        } else {
            products.deleteById(req.params.id)
            res.json({ProductoEliminado: removedProduct})
        }
        
    } catch (error) {
        console.log(error);

    }
})

module.exports.router = router
module.exports.products = products