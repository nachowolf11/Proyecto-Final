const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bcrypt = require('bcrypt')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const path = require('path')
const app = express()

const productos = require('./routes/productos-route')
const carritos = require('./routes/carritos-routes')

//Persistencia MongoDB
const {mongoose} = require('./database')
const MongoStore = require('connect-mongo')
const User = require('./models/users')
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}

//Settings
app.set('port', process.env.PORT || 8080)

//App Middlewares
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
    saveUninitialized:false,
    cookie:{
        maxAge: 100000,
        httpOnly: false,
        secure:false
    },
    rolling: true
}))
app.use(passport.initialize())
app.use(passport.session())

//Passport Config
    //Signup
    passport.use('signup', new LocalStrategy(
        {passReqToCallback:true},
        (req,username, password, done)=>{
            User.findOne({'username':username},(err,user)=>{
                if(err){console.log(err);return done(err)}
                if(user){console.log('User exist');return done(null,false)}
                
                bcrypt.hash(password, 8, (error, cryptPass)=>{
                    if(error) throw error;
                    const newUser = {username, password: cryptPass, name: req.body.name}
                    console.log(newUser);
                    User.create(newUser,(err,userWithId)=>{
                        if(err) return done(err)
                        return done (null,userWithId)
                    })
                })
            })
        }
    ))

    //Login
passport.use('login', new LocalStrategy(
    (username,password,done)=>{
        User.findOne({'username': username},(err, user)=>{
            if(err){return done(err)}
            if (!user) {
                console.log('User not found');
                return done(null,false)
            }
            bcrypt.compare(password, user.password,(error, result)=>{
                if(error) throw error;
                if(result){
                    console.log('encontrado');
                    return done(null,user)
                }else{
                    console.log('Incorrect Password');
                    return done(null,false)
                }
            })
        })
    }
))

passport.serializeUser((user,done) => { done(null,user._id)})
passport.deserializeUser((id, done) => { User.findById(id,done)})


//Middlewares
function isLogged(req,res,next) {
    if(req.isAuthenticated()){next()}
    else{res.sendFile(path.join(__dirname,'/public/login.html'))}
}

//Static Files
app.use(express.static(__dirname+'/public'))

//Routes
app.use('/api/productos', isLogged, productos.router)
app.use('/api/carritos', isLogged, carritos.router)

//Signup
app.post('/signup', passport.authenticate('signup',{
    successRedirect: '/productos.html',
    failureRedirect: '/failsignup',
    passReqToCallback: true
}))

//Login
app.post('/login', passport.authenticate('login',{
    successRedirect: '/productos.html',
    failureRedirect: '/faillogin',
    passReqToCallback: true
}))
app.get('/faillogin',(req,res)=>{
    res.send('Datos incorrectos')
})

//Logout
app.get('/logout',function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

//GetUserData
app.get('/session',async (req,res)=>{
   res.send(req.session)
})

//Starting the server
app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`);
})