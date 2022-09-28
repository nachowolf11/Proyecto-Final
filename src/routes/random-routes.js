const express = require('express')
const router = express.Router()

const { fork } = require('child_process')

router.get('/',(req,res)=>{
    const cant = req.query.cant || 100000000
    const child = fork('./src/process/random.js')
    child.send({cant})
    child.on('message', random => {
        res.send(random)
    })
})

module.exports.router = router