const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const postSignUp = async(req,res)=>{
    try{
        const{email,password} = req.body
        if(email.length ==0 || email==undefined|| password.length==0||password ==undefined){
            return res.status(500).json({message:"bad params"})
        }
         
        const ifUser = await User.find({email:email})
       
        if(ifUser.length>0){
            return res.status(500).json({message:"user already exits"})
        }else{
            bcrypt.hash(password,10,async(err,hash)=>{
                if(err){
                 throw new Error("some thing went wrong")
                }
 
                const user = new User({email:email,password:hash})
                await user.save()
                res.status(201).json({message:"user created"})
             })
        }
        
    }catch(e){
        return res.status(500).json({error:e})
    }
          
           

}

const generateToken = (id) =>{
   return jwt.sign({userId:id},"secretKey",{
        expiresIn:"30m"
    })
}

const postLogin = async (req,res)=>{


    try{
        const {email,password} = req.body
    if(email.length ==0 || email==undefined|| password.length==0||password ==undefined){
        return res.status(500).json({message:"bad params"})
    }
    const user = await User.find({email:email})
    if(user.length>0){
        bcrypt.compare(password,user[0].password,async(err,result)=>{
            if(err){
                throw new Error("some thing went wrong")
               }
               if(result == true){
                  return res.status(200).json({message:"login sucess",token:generateToken(user[0]._id)})
               }else{
                return res.status(401).json({message:"invalid password"})
               }

        })
    }else{
        return res.status(404).json({message:"no user found"})
    }
    }catch(e){
        return res.status(500).json({error:e})
    }
   

}

const getUser = async(req,res)=>{
    try{
             const isUser = await User.findById(req.user._id)
            // console.log(isUser.email)
             if(!isUser){
               return res.statusCode(401)
             }
             return res.status(200).json({user:isUser.email})
    }catch(e){
        return res.status(500).json({error:e})
    }
}




module.exports ={postSignUp,postLogin,generateToken,getUser}