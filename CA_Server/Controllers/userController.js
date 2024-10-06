const userModel=require("../Models/userModel");
const bcrypt=require("bcrypt");
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { ErrorHandler } = require("../utils/ErrorHandlerClass");





    const sendVerificationEmail = (email, token) => {
      try{
        const url = `${process.env.CLIENT_URL}/verify?token=${token}`;

        const transporter = nodemailer.createTransport({
          service: 'Gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
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
        return next(new ErrorHandler("User not found" , 400));
      }
      if (user.verified) {
        return next(new ErrorHandler("User is already verified" , 400));
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





  
  const userLogin=async(req,res,next)=>{
    try{
      const {email,password}=req.body;
      const login=await userModel.findOne({email:email});
      if(!login)
      {
        return next(new ErrorHandler("Email not found" , 400));
      }
      const validpassword=await bcrypt.compare(password,login.password);
      if(!validpassword)
      {
        return next(new ErrorHandler("Incorrect password" , 400));
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
        return next(new ErrorHandler(error.message || "Internal server error" , 500))
    }
}



const resetPasswordMail=(token,email)=>{
      try{
      const url = `${process.env.CLIENT_URL}/resetpassword?token=${token}`;

      const transporter = nodemailer.createTransport({
        service: 'Gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

       transporter.sendMail({
        from: 'chandel486670@gamil.com',
        to: email,
        subject: 'Reset Your Password',
        html: `<p>Please click the link to reset your password:</p> <a href="${url}"><button>Click here to reset password</button></a>`
      });
    
      } catch(error)
      {
        return next(new ErrorHandler(error.message || "Internal server error" , 500))
      }
}



const forgotPassword=async(req,res,next)=>{
  const {email}=req.body;
  try{
  const user=await userModel.findOne({email:email});

  if(!user) return next(new ErrorHandler(error.message || "User not found" , 400));

  const token=jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'10m'});

      await resetPasswordMail(token,user.email);
      res.status(200).json({message:"Reset password link has sent to your email"})
  } catch(error){
    return next(new ErrorHandler(error.message || "Internal server error" , 500))
  }
}





const resetPassword=async(req,res,next)=>{
  const {token,password}=req.body;
  try{
  const verifyuser=jwt.verify(token,process.env.JWT_SECRET_KEY);

  const user=await userModel.findById(verifyuser.id);
  if(!user) return next(new ErrorHandler(error.message || "User not found" , 400));

  const salt=await bcrypt.genSalt(10);
  const hashedpassword=await bcrypt.hash(password,salt);

  user.password=hashedpassword;
  await user.save();

  res.status(200).json({message:"Password reset successful"});

  } catch(error)
  {
    return next(new ErrorHandler(error.message || "Internal server error" , 500));
  }
}

module.exports={
    userSignup,
    verifyEmail,
    userLogin,
    forgotPassword,
    resetPassword,
}