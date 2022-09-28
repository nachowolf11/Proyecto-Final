const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
require('dotenv').config()
const bcrypt = require('bcrypt')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const path = require('path')
const app = express()

const parseArgs = require('minimist')
const args = parseArgs(process.argv.slice(2))

//Routes
const productos = require('./src/routes/productos-route')
const carritos = require('./src/routes/carritos-routes')
const users = require('./src/routes/users-route')
const info = require('./src/routes/info-routes')
const random = require('./src/routes/random-routes')
app.use('/api/productos', productos.router)
app.use('/api/carritos', carritos.router)
app.use('/api/users', users.router)
app.use('/api/info', info.router)
app.use('/api/random',random.router)

//Persistencia MongoDB
const {mongoose} = require('./src/database')
const MongoStore = require('connect-mongo')
const User = require('./src/models/users')
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}

//Settings
app.set('port', process.env.PORT || args.port || 8080)

//App Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl:process.env.MONGOSTOREURL,
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
// function isLogged(req,res,next) {
//     if(req.isAuthenticated()){next()}
//     else{res.sendFile(path.join(__dirname,'/public/login.html'))}
// }

//Static Files
app.use(express.static(__dirname+'/public'))

//Signup
app.post('/signup', passport.authenticate('signup',{
    successRedirect: '/',
    failureRedirect: '/signup',
    passReqToCallback: true
}))

//Login
app.post('/login', passport.authenticate('login',{
    successRedirect: '/',
    passReqToCallback: true
}))

//Logout
app.get('/logout',function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

//GetSessionData
app.get('/session',async (req,res)=>{
   res.send({session:req.session})
})

//Starting the server
app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`);
})