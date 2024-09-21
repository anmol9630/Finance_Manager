const userModel=require("../Models/userModel");
const bcrypt=require("bcrypt");
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const crypto=require("crypto");
const { ErrorHandler } = require("../utils/ErrorHandlerClass");

 





    const sendVerificationEmail = (email, token) => {
      try{
        const url = `${process.env.CLIENT_URL}/verify?token=${token}`;

        const transporter = nodemailer.createTransport({
          host: 'in-v3.mailjet.com',   
          port: 587,                   
          secure: false,               
          auth: {
          user: process.env.MAILJET_API_KEY,  //Mailjet API Key (public)
          pass: process.env.MAILJET_API_SECRET  //Mailjet API Secret (private)
        }
      });
  
        transporter.sendMail({
          from: 'chandel486670@gmail.com',
          to: email,
          subject: 'Verify Your Email',
          html: `<p>Please click the link to verify your email:</p> <a href="${url}"><button>Click here to verify</button></a>`
        });
      }catch(err){
        console.log(err);
      return next(new ErrorHandler(err.message || "Something went wrong" , 200))
      }  
    };

const userSignup=async(req,res,next)=>{
  try{
    const {name,email,password}=req.body;
         const userexist=await userModel.findOne({email:email});
         if(userexist) return next(new ErrorHandler("Email allready Exists" , 409))

        const salt=await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(password,salt);

        const userData=await userModel.create({
            name:name,
            email:email,
            password:hashedpassword,
            verified:false
        })

        const token=jwt.sign({userid:userData._id,password:userData.password},process.env.JWT_SECRET_KEY,{expiresIn:'10m'});
        await sendVerificationEmail(userData.email,token);
        res.status(200).json({
          success:true,
          message:`Verification email sent to ${userData.email}. Please verify to continue`
        })
        // return next(new ErrorHandler(error.message || 'something went wrong' , 500))
  }
    catch(err){
      console.log(err);
      return next(new ErrorHandler(err.message || "Something went wrong" , 200))
    }
}

const verifyEmail = async (req, res,next) => {
  try {
    const { token } = req.query;
    if (!token) {
      return next(new ErrorHandler("Please provide a token for authentication" , 400));
    }
  

      const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await userModel.findById(decode.userid);
  
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      if (user.verified) {
        return res.status(400).json({ message: 'User is already verified' });
      }
      user.verified = true;
      await user.save();

      const tokens=jwt.sign({id:user._id,name:user.name},process.env.JWT_SECRET_KEY,{expiresIn:'90d'});
      res.cookie('Finance_CA', tokens, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict', 
        maxAge: 90 * 24 * 60 * 60 * 1000
    });
  
      res.status(200).json({ success:true,message: 'Email verified. Now you can login' });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success:false, message: 'Invalid or expired token' });
    }
  };

  const Verified=async(req,res,next)=>{
    const email=req.body.email;
      const user=await userModel.findOne({email:email});
      if(!user.verified){
        return res.status(403).json("Please verify your email first");
      }
      next();
  }


  const userLogin=async(req,res,next)=>{
    try{
      const {email,password}=req.body;
      const login=await userModel.findOne({email:email});
      if(!login)
      {
        return res.status(400).json({
            msg:"Email not found",
            status:"400 Bad Request"
        })
      }
      const validpassword=await bcrypt.compare(password,login.password);
      if(!validpassword)
      {
        return res.status(400).json({
            msg:"Incorrect Password",
            status:"400 Bad Request"
        })
      }

      const token=jwt.sign({id:login._id,name:login.name},process.env.JWT_SECRET_KEY,{expiresIn :'90d'});
      res.cookie('Finance_CA', token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict', 
        maxAge: 90 * 24 * 60 * 60 * 1000
    });
  
      res.status(200).json({ message: 'You have logged in successfully' });
      } catch (error) {
        console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports={
    userSignup,
    verifyEmail,
    Verified,
    userLogin
}