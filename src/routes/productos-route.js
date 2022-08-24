const express = require('express')
const router = express.Router()

const Productos = require('../models/productos')

//Obtiene todos los productos
router.get('/',async(req,res)=>{
    try {
        const productos = await Productos.model.find()
        res.json({data: productos})
    } catch (error) {
        console.log(error);
    }
})

//Obtiene el producto con el id indicado.
router.get('/:id',async(req,res)=>{
    try {
        const producto = await Productos.model.find({id:req.params.id})
        res.json({data: producto})
    } catch (error) {
        console.log(error);
    }
})

//Crea un producto
router.post('/',async(req,res)=>{
    try {
        const idExiste = await Productos.model.find({id:req.body.id})
        if (idExiste.length > 0) {
            res.json('Ya existe un producto con el ID ingresado.')
        } else {
            let producto = req.body
            producto = {
                ...producto,
                timestamp:Date.now()
            }
            const prodModel = new Productos.model(producto)
            await prodModel.save()
            res.json({producto:prodModel})   
        }
    } catch (error) {
        console.log(error);
    }
})

//Actualiza un producto
router.put('/:id',async(req,res)=>{
    try {
        await Productos.model.findOneAndUpdate(req.params.id,req.body)
        res.json('El producto fue actualizado correctamente')
    } catch (error) {
        console.log(error);
    }
})

//Borra un producto
router.delete('/:id',async(req,res)=>{
    try {
        await Productos.model.findOneAndDelete({id:req.params.id})
        res.json(`El producto de ID: ${req.params.id} fue eliminado.`)
    } catch (error) {
        console.log(error);
    }
})

module.exports.router = router