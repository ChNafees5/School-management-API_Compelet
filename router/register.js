const express=require('express')
const router = express.Router()
require ('dotenv').config()
const User = require('../model/signup')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const checkauth = require('../middleware/check-auth')


router.post("/register", async(req,res)=>{
    console.log('you are inside the post')
    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(req.body.password, salt)
    const data = new User({
      name:req.body.name,
      email:req.body.email,
      password:hashpassword,
      city:req.body.city
    })

    try {
        const val= await data.save()
        res.json( val)
    } catch(error) {
       res.status(400).json ({message: error.message})
    }
 })


 router.post('/login', async (req, res) => {
try{
    const user = await User.findOne({ name: req.body.name })
    !user && res.status(400).json('wrong credentials')
    
    const originalPassword = await bcrypt.compare(req.body.password, user.password)
    !originalPassword && res.status(422).json('incorrect password')
    const accessToken = jwt.sign(
        {
            id: user._id,
            city: user.city
        },
     //  process.env.JWT_SEC,
    'this is dummy text',
        { expiresIn: '24h' }
    )
 //   const { password, ...others } = user._doc
//     res.status(200).json({ ...others, accessToken })
 res.status(200).json( { name:user.name,   city:user.city,accessToken:accessToken})
}
    catch(err){
        res.status(500).json(err);
    }
})
 




//getting all data
 router.get ('/tok', checkauth,async (req, res)=>{
    //res.send('Hello word')
    try {
        const signupdata= await User.find()
        res.json( signupdata)
    } catch(error) {
       res.status(500).json ({message: error.message})
    }
})
//getting one
router.get ('/:id', getsubcriber, (req, res)=>{
    res.send(res.users)
})
//
//updating one
router.patch ('/:id',getsubcriber, async(req, res)=>{
    if(req.body.name!= null){
        res.users.name=req.body.name
    }
    if(req.body.email!= null){
        res.users.email=req.body.email
    }
    if(req.body.password!= null){
        res.users.password=req.body.password
    }
    if(req.body.city!= null){
        res.users.city=req.body.city
    }
    try {
        const updateuse = await res.users.save()
        res.json(updateuse)
    } catch (error) { res.status(400).json ({message: error.message})
        
    }}
)
//Deleting one
router.delete ('/:id',getsubcriber, async(req, res)=>{
    try {
        await res.users.remove()
            
       res.json({message:'delete the user'})
    } catch (error) {
        res.status(500).json ({message: error.message})
         }
    })
async function getsubcriber(req, res, next){
    let users
    try {
        users= await User.findById(req.params.id)

        if (users == null){
        return res.status(404).json({message: 'Cannot find user' })
        } 
    } 
    catch(error) {
       res.status(500).json ({message: error.message})
         }
    res.users =users
    next()
}
 module.exports=router