const express = require('express')
const router = express.Router()
const Carts = require('../Clases/carts')

const carts = new Carts('carts.json')

router.get('/:id/productos',(req,res)=>{
    try {
        const cart = carts.getCartByID(req.params.id)
        res.json(cart.productos)
    } catch (error) {
        console.log(error);
    }
})

router.post('/',(req,res)=>{
    try {
        res.json(carts.saveCart())
    } catch (error) {
        
    }
})

router.delete('/:id',(req,res)=>{
    try {
        carts.deleteCart(req.params.id)
        res.json({Exito: `El carrito ID: ${req.params.id} fue eliminado exitosamente.`})
    } catch (error) {
        console.log(error);
    }
})

router.post('/:id/productos', (req,res)=>{
    try {
        const ids = req.body.id
        const cartID = req.params.id
        carts.addProductToCart(cartID,ids)
        res.json({dato:"VAMO CONCHETUMADRE"})
    } catch (error) {
        
    }
})

router.delete('/:id/productos/:id_prod',(req,res)=>{
    try {
        carts.removeProductToCart(req.params.id,req.params.id_prod)
        res.json({Exito: `El producto fue eliminado exitosamente`})
    } catch (error) {
        console.log(error);
    }
})

module.exports.router = router