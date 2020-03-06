const md5=require('md5')
const { createUser, getAllUser, getUserByEmail,veryfyUser } = require('../DB/queries/user')
const { createJWT } = require('../middleware/auth')
const H = require('./../helper/commonHelper');

const { User } = require('./../DB/models/user');

module.exports.userSignUp = async (req, res) =>{
    console.log('api call');
    const body = req.body
    await createUser({ username: body.username, email: body.email, password:md5(body.password),phone:body.phone,location:body.location,country:body.country,occupation:body.occupation,isvarified:body.isvarified})
    // const token = await createJWT({ email: body.email, username: body.username ,phone:body.phone,password:body.password,location:body.location,country:body.country,occupation:body.occupation,isvarified:body.isvarified})
    let link =`http://localhost:3000/api/user/verify?email=${body.email}`;
    H.sendEmail(body.email,link);
    res.status(200).send({ message: 'user created successfully and verify your email'})
}

module.exports.userSignIn = async (req, res) =>{
    const { email,password } = req.body
    const user = await getUserByEmail(email)
    if (!user || user.password !== md5(password)==user.password){
        res.status(401).send({ message: 'emailId or password is incorrect'})
        return
    }
    const token = createJWT({ email: user.email, username: user.username })
    res.send({ message: 'login Success', token})
}

module.exports.verifyUser= async (req, res) =>{
   try {
       const {email}=req.query;
       await User.findOneAndUpdate({email:req.query.email},{$set:{isVarified:true}});
       res.send('email verified successfully');
   } catch (e){
    console.log('e::::',e);       
   }
   // User.updateOne({email},{isVarified:true})
   // console.log('eq.query:::::',req.query);

   // await verifyUser(email)
   // res.send({isvarified:true},{"message":"user is verified"})
}

module.exports.getSelf = async (req, res) => {
    const { email } = req.body
    const data = await getUserByEmail(email)
    res.send(data)
}
































