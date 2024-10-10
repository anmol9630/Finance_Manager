const userModel=require("../Models/userModel");
 const isAuthenticated=async(req,res,next)=>{
    const email=req.body.email;
      const user=await userModel.findOne({email:email});
      if(!user.verified){
        return next(new ErrorHandler("Please Verify your email first" , 403));
      }
      next();
  }

  module.exports = isAuthenticated;