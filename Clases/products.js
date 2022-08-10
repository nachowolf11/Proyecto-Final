const fs = require ('fs')

class Products{
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
    save(object){
        let product = {}
        let lastId = 0
        try {
            const arr = this.getAll()
            if(arr){
                if(arr.length > 0) lastId = arr[arr.length - 1].id
                product = {
                    id: lastId+1,
                    timestamp:Date.now(),
                    name:object.name,
                    description:object.description, 
                    code:object.code, 
                    url:object.url, 
                    price:object.price, 
                    stock:object.stock
                }
                arr.push(product)
                fs.writeFileSync(this.fileName,JSON.stringify(arr))
            }
        } catch (error) {
            console.log(error);
        }
        
    }
    getById(number){
        try {
            const arr = this.getAll()
            let producto = null
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].id == number) {
                    producto = arr[i]
                }
            }
            return producto
        } catch (error) {
            console.log('Hubo un error al encontrar el producto.');
        }
    }
    deleteById(number){
        try {
            let arr = this.getAll()
            let newArr = []
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].id != number) {
                    newArr.push(arr[i])
                }
            }
            fs.writeFileSync(this.fileName,JSON.stringify(newArr))
        } catch (error) {
            console.log('Hubo un error al borrar el producto.');
        }
    }
    update(product){
        try {
            const arr = this.getAll()
            const index = arr.findIndex(item => item.id == product.id)
            console.log(index);
            arr[index] = product
            console.log(arr);
            fs.writeFileSync(this.fileName,JSON.stringify(arr))
        } catch (error) {
            
        }
    }
}

module.exports = Products;
