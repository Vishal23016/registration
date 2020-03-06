const mongoose = require('mongoose')

let mongoConnection = mongoose
    .connect('mongodb://localhost:27017/vp_demo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>console.log('mongoDB connected'))
    .catch(err => console.log(err))

const mongoDB = mongoConnection

module.exports = mongoDB
