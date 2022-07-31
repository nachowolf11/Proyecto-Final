const fs = require('fs')
const products = require('../Routers/productos-router')



class Carts{
    constructor(fileName){
        this.fileName = fileName
    }
    getAll() {
        try {
            const arr = fs.readFileSync(this.fileName, 'utf-8');
            const arrParsed = JSON.parse(arr);
            return arrParsed;
        } catch (err) {
            console.log(err);
        }
    }
    getCartByID(id){
        try {
            const arr = this.getAll()
            return arr.find(cart => cart.id == id)
        } catch (error) {
            
        }
    }
    saveCart(){
        let newCart = {}
        let lastId = 0
        try {
            const arr = this.getAll()
            if(arr && arr.length > 0) lastId = arr[arr.length - 1].id
            newCart = {
                id: lastId+1,
                timestamp: Date.now(),
                productos: []
            }
            arr.push(newCart)
            fs.writeFileSync(this.fileName,JSON.stringify(arr))
            return newCart.id
        } catch (error) {
            console.log(error);
        }
    }
    deleteCart(id){
        const carts = this.getAll()
        const newCarts = carts.filter(cart => cart.id != id)
        fs.writeFileSync(this.fileName,JSON.stringify(newCarts))
    }
    addProductToCart(cartID,ids){
        const carts = this.getAll()
        const cartIndex = carts.findIndex(cart => cart.id == cartID)
        const notProducts = []
        ids.forEach(id => {
            if (products.products.getById(id)) {
                carts[cartIndex].productos.push(products.products.getById(id))   
            }else{
                notProducts.push(id)
            }
        })
        fs.writeFileSync(this.fileName,JSON.stringify(carts))
    }
    removeProductToCart(cartID,id_prod){
        const carts = this.getAll()
        const cartIndex = carts.findIndex(cart => cart.id == cartID)
        const newCart = carts[cartIndex].productos.filter(prod => prod.id != id_prod)
        carts[cartIndex].productos = newCart
        fs.writeFileSync(this.fileName,JSON.stringify(carts))
    }
}

module.exports = Carts;