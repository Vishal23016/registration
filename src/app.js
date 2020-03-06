require('dotenv').config()
const express = require('express')
const nodemailer=require('nodemailer')
const app = express()
const routes = require('./routes')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('./DB')
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(routes)
require('./DB/index.js');


module.exports = app
