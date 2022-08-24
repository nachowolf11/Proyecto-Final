const mongoose = require('mongoose')
const URI = "mongodb+srv://nachowolf11:nacho2022@cluster0.3z8w4dp.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(URI)
    .then(db =>{console.log('DB is connected');})
    .catch(err =>{console.log(err);})

module.exports = mongoose;