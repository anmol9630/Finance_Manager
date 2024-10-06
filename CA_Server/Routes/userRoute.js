const express=require("express");
const route=express.Router();
const {userSignup,userLogin,verifyEmail,Verified,forgotPassword,resetPassword,adminLogin}=require("../Controllers/userController");
const { isAuthenticated } = require("../middleware/isAuthenticated");

route.post("/usersignup",userSignup);
route.get("/verifyemail",verifyEmail);
route.post("/userlogin",isAuthenticated,userLogin);
route.post("/forgotpassword",forgotPassword);
route.post("/resetpassword",resetPassword);


module.exports=route;