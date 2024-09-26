const express=require("express");
const route=express.Router();
const {userSignup,userLogin,verifyEmail,Verified,forgotPassword,resetPassword}=require("../Controllers/userController");

route.post("/usersignup",userSignup);
route.get("/verifyemail",verifyEmail);
route.post("/userlogin",Verified,userLogin);
route.post("/forgotpassword",forgotPassword);
route.post("/resetpassword",resetPassword);


module.exports=route;