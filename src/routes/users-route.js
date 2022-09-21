const express = require('express')
const router = express.Router()

const User = require('../models/users')

//Obtiene todos los usuarios
router.get('/',async(req,res)=>{
    try {
        const usuarios = await User.find()
        console.log(usuarios);
        res.json({users: usuarios})
    } catch (error) {
        console.log(error);
    }
})

module.exports.router = router