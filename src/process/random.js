const cant = 0
process.on("message",(message)=>{
    const resultado = random(message.cant)
    process.send(resultado)
})

function random(cant) {
    const random = {}
    for (let i = 0; i < cant; i++) {
        const numero = Math.floor(Math.random()*1001)
        if(!random.hasOwnProperty(numero)){
            random[`${numero}`] = 1
        }else{
            random[`${numero}`]++
        }
    }
    return random   
}