const express = require('express')
const productos = require('./Routers/productos-router')
const carrito = require('./Routers/carrito-router')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const PORT = process.env.PORT || 8080

app.use(express.static(__dirname + '/public'))
app.use('/api/productos',productos.router)
app.use('/api/carrito', carrito.router)

const server = app.listen(PORT, () => {
    console.log(`Server listening [${PORT}]...`);
})