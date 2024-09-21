const express=require("express");
const route=express.Router();
const {userSignup,userLogin,verifyEmail,Verified}=require("../Controllers/userController");

route.post("/usersignup",userSignup);
route.get("/verifyemail",verifyEmail);
route.post("/userlogin",Verified,userLogin);


module.exports=route;