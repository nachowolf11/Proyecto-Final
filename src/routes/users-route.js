const express = require('express')
const users = require('../models/users')
const router = express.Router()

const User = require('../models/users')

//Obtiene todos los usuarios
router.get('/',async(req,res)=>{
    try {
        const users = await User.find()
        res.json({users: users})
    } catch (error) {
        console.log(error);
    }
})

//Obtiene el usuario con el id indicado.
router.get('/:id',async(req,res)=>{
    try {
        const user = await users.findById(req.params.id)
        res.json({user: user})
    } catch (error) {
        console.log(error);
    }
})

module.exports.router = router