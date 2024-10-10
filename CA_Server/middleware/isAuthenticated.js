const userModel=require("../Models/userModel");
<<<<<<< HEAD
 const isAuthenticated=async(req,res,next)=>{
=======
const { ErrorHandler } = require("../utils/ErrorHandlerClass");

const isAuthenticated=async(req,res,next)=>{
>>>>>>> 876a9a5fe9b7326c12ab090771cff2197b1b13f8
    const email=req.body.email;
      const user=await userModel.findOne({email:email});
      if(!user) {return next(new ErrorHandler("User not found"),400)}
      if(!user.verified){
        return next(new ErrorHandler("Please Verify your email first" , 403));
      }
      next();
  }

<<<<<<< HEAD
  module.exports = isAuthenticated;
=======
module.exports={
  isAuthenticated
}
>>>>>>> 876a9a5fe9b7326c12ab090771cff2197b1b13f8
