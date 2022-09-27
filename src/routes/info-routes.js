const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
    const so = process.platform
    const nodev = process.version
    const memoryRss = process.memoryUsage().rss
    const directorio = process.cwd()
    const id = process.pid
    const argv = process.argv.slice(2)
    const path = process.argv[0]
    const info = {
        argv,
        so,
        nodev,
        memoryRss,
        path,
        id,
        directorio
    }
    res.send(info)
})

module.exports.router = router