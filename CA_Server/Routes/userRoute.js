const express=require("express");
const route=express.Router();
<<<<<<< HEAD
// <<<<<<< HEAD
const {userSignup,userLogin,verifyEmail,Verified,forgotPassword,resetPassword,adminLogin,userInfo}=require("../Controllers/userController");
// =======
// const {userSignup,userLogin,verifyEmail,Verified,forgotPassword,resetPassword,adminLogin}=require("../Controllers/userController");
const { isAuthenticated } = require("../middleware/isAuthenticated");
// >>>>>>> 9a700f0c4c0ebf09f6f689c4da591f301bf25490
=======

const {userSignup,userLogin,verifyEmail,forgotPassword,resetPassword,userInfo}=require("../Controllers/userController");
const { isAuthenticated } = require("../middleware/isAuthenticated");
>>>>>>> 876a9a5fe9b7326c12ab090771cff2197b1b13f8

route.post("/usersignup",userSignup);
route.get('/me' , userInfo)
route.get("/verifyemail",verifyEmail);
route.post("/userlogin",isAuthenticated,userLogin);
route.post("/forgotpassword",forgotPassword);
route.post("/resetpassword",resetPassword);


module.exports=route;