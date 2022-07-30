const express = require('express')
const router = express.Router()
const Carts = require('../Clases/carts')

const carts = new Carts('carts.json')

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
        const ids = req.body.ids
        const cartID = req.params.id
        carts.addProduct(cartID,ids)
        res.json({dato:"VAMO CONCHETUMADRE"})
    } catch (error) {
        
    }
})

module.exports.router = router