const mongoose = require('mongoose')
const { Schema } = mongoose;

const ProductoSchema = new Schema({
    id:{type:Number, required:true},
    timestamp:{ type: Date, required:true},
    name:{ type: String, required:true},
    description:{ type: String, required:true},
    code:{ type: String, required:true},
    url:{ type: String, required:true},
    price:{ type: Number, required:true},
    stock:{ type: Number, required:true}
})

module.exports.model = mongoose.model('Productos', ProductoSchema)
module.exports.ProductoSchema = ProductoSchema