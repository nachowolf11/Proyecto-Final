const express = require('express')
const router = express.Router()

const Productos = require('../models/productos')
const Carritos = require('../models/carritos')

//Obtiene el carrito con el ID indicado.
router.get('/:id/productos',async(req,res)=>{
    try {
        const carrito = await Carritos.find({id:`${req.params.id}`})
        res.json({data:carrito})
    } catch (error) {
        console.log(error);
    }
})

//Crea un nuevo carrito.
router.post('/',async(req,res)=>{
    try {
        const idExiste = await Carritos.find({id:req.body.id})
        if (idExiste.length > 0) {
            res.json('Ya existe un carrito con el ID ingresado.')
        } else {
            const carrito = new Carritos(req.body)
            await carrito.save()
            res.json({data:carrito})   
        }
    } catch (error) {
        console.log(error);
    }
})

//Elimina un carrito
router.delete('/:id',async(req,res)=>{
    try {
        await Carritos.findOneAndDelete(req.params.id)
        res.json('Carrito borrado exitosamente')
    } catch (error) {
        console.log(error);
    }
})

//Agrega un producto con el id indicado al carrito.
router.post('/:id/productos',async(req,res)=>{
    try {
        const producto = await Productos.model.find(req.body)
        const carrito = await Carritos.find({id:req.params.id})
        const productos = carrito[0].productos
        //Les modifico el id para que dentro del carrito los pueda diferenciar
        //Ya que no cuentan con contador para modificar cantidad.
        const idProd = productos.length + 1
        producto[0].id = idProd
        if (producto.length == 0) {
            res.json('No existe producto con el id ingresado.')
        }else{
            await Carritos.findOneAndUpdate(req.params.id,{
                $push: {
                    'productos': producto
                } 
            })
            res.json(`El producto de ID: ${req.body.id} fue agregado.`)
        }

    } catch (error) {
        console.log(error);
    }
})

//Elimina un producto con el id indicado del carrito.
router.delete('/:id/productos/:id_prod',async(req,res)=>{
    try {
        //Verifico que el producto a eliminar se encuentre en el carrito.
        const carrito = await Carritos.find({id:req.params.id})
        const exist = carrito[0].productos.find(prod=>prod.id = req.params.id_prod)
        if (!exist) {
            res.json('El carrito no posee el producto indicado.')
        }else{
            await Carritos.findOneAndUpdate({id:req.params.id},{
                $pull: {
                    'productos': {id: req.params.id_prod}
                } 
            })
            res.json(`El producto de ID: ${req.params.id_prod} fue eliminado.`)
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports.router = router