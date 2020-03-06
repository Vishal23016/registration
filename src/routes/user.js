const express = require("express")
const app = express.Router()
const { userSignUp, userSignIn,verifyUser, getSelf } = require('../controller/user')
const { signUpValidator, signInValidator} = require('../validators/user')
const { validateToken } = require('../middleware/auth')

app.post("/user/signup", signUpValidator, userSignUp)
app.get("/user/verify",verifyUser)
app.post("/user/signin", signInValidator, userSignIn)


/*
*@need to two api call
* first user registration api with send email user email id
*/


app.get("/user/self", validateToken, getSelf)
module.exports = app












