const express = require('express')
const path = require('path')
const app = express()

const productos = require('./routes/productos-route')
const carritos = require('./routes/carritos-routes')

const {mongoose} = require('./database')

//Settings

app.set('port', process.env.PORT || 3000)

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Static Files
app.use(express.static(path.join(__dirname,'/public')))

//Routes
app.use('/api/productos', productos.router)
app.use('/api/carritos', carritos.router)

//Starting the server
app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`);
})