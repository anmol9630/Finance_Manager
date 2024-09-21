const userModel=require("../Models/userModel");
const bcrypt=require("bcrypt");
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const crypto=require("crypto");

  
const userSignup=async(req,res)=>{
    const {name,email,pass}=req.body;

    const transporter = nodemailer.createTransport({
    host: 'in-v3.mailjet.com',   
    port: 587,                   
    secure: false,               
    auth: {
    user: 'f51ead97cb47886c2891493a3ee921c3',  //Mailjet API Key (public)
    pass: '466f3e23b5ce0d826b45195588f487a3'  //Mailjet API Secret (private)
  }
      });

      const sendVerificationEmail = (email, token) => {
        const url = `http://localhost:6000/verifyemail?token=${token}`;
      
        return transporter.sendMail({
          from: 'chandel486670@gmail.com',
          to: email,
          subject: 'Verify Your Email',
          html: `<p>Please click the link to verify your email:</p> <a href="${url}">${url}</a>`
        });
      };

      function generateSecretKey() {
        return crypto.randomBytes(32).toString('hex');
      
      }
    const secretkey=generateSecretKey();
    try{
         const userexist=await userModel.findOne({email:email});
         if(userexist)
            {
                return res.status(400).json("Email already exist");
            }

        const salt=await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(pass,salt);

        const userData=await userModel.create({
            name:name,
            email:email,
            password:hashedpassword,
            verified:false
        })

        const token=jwt.sign({userid:userData._id,password:userData.password},secretkey,'10m');
        sendVerificationEmail(userData.email,token);

    } catch(error){
         return res.status(500).json({
            msg:"Invalid input",
            status:"Internal Server Error"
         })
    }
}

const verifyEmail = async (req, res) => {
    const { token } = req.query;
  
    if (!token) {
      return res.status(400).json({ message: 'No token available' });
    }
  
    try {
      const decode = jwt.verify(token, secretkey);
      const user = await userModel.findById(decode.userid);
  
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      if (user.verified) {
        return res.status(400).json({ message: 'User is already verified' });
      }
      user.verified = true;
      await user.save();

      const token=jwt.sign({id:user._id,name:user.name},'90d');
      res.cookie('mycookie', token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict', 
        maxAge: 90 * 24 * 60 * 60 * 1000
    });
  
      res.status(200).json({ message: 'Email verified. Now you can login' });
    } catch (error) {
      res.status(400).json({ message: 'Invalid or expired token' });
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

  const userLogin=async(req,res)=>{
      const {email,password}=req.body;
      try{
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

      const token=jwt.sign({id:user._id,name:user.name},'90d');
      res.cookie('mycookie', token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict', 
        maxAge: 90 * 24 * 60 * 60 * 1000
    });
  
      res.status(200).json({ message: 'You have logged in successfully' });
      } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports={
    userSignup,
    verifyEmail,
    Verified,
    userLogin
}