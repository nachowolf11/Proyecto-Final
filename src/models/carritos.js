const mongoose = require('mongoose')
const Productos = require('./productos')
const { Schema } = mongoose;

const CarritosSchema = new Schema({
    id:{type:Number, required:true},
    timestamp:{ type: Date, required:true},
    productos:[Productos.ProductoSchema]
})

module.exports = mongoose.model('Carritos', CarritosSchema)