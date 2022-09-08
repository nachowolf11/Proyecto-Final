const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const path = require('path')
const app = express()

const productos = require('./routes/productos-route')
const carritos = require('./routes/carritos-routes')

//Persistencia MongoDB
const {mongoose} = require('./database')
const MongoStore = require('connect-mongo')
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}

//Settings
app.set('port', process.env.PORT || 8080)

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl:"mongodb://nachowolf:nachowolf@ac-d21jpuh-shard-00-00.3z8w4dp.mongodb.net:27017,ac-d21jpuh-shard-00-01.3z8w4dp.mongodb.net:27017,ac-d21jpuh-shard-00-02.3z8w4dp.mongodb.net:27017/?ssl=true&replicaSet=atlas-5c4fko-shard-0&authSource=admin&retryWrites=true&w=majority",
        mongoOptions: advancedOptions
    }),
    secret:"secret",
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge: 60000
    }
}))

//Static Files
app.use(express.static(path.join(__dirname,'/public')))

//Routes
app.use('/api/productos', productos.router)
app.use('/api/carritos', carritos.router)

//Login
app.post('/login',(req,res)=>{
    try {
        const {username, password} = req.body
        //Validación
        // if (username !== 'pepe' || password !== 'pepepass') {
        //     return res.send('login failed')
        // }
        req.session.user = {username:username}
        req.session.admin = true
        res.send('login success')
    } catch (error) {
        console.log(error);
    }

})

//Logout
app.get('/logout',(req,res)=>{
    req.session.destroy(err=>{
        if(err){
            return res.json({status: 'Logout error', body:err})
        }
        res.send('Logout OK')
    })
})

//GetUserData
app.get('/session',async (req,res)=>{
   res.send(req.session)
})

//Starting the server
app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`);
})