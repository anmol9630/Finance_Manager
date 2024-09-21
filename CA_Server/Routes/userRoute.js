const express=require("express");
const route=express.Router();
const userController=require("../Controllers/userController");

route.post("/usersignup",userController.userSignup);
route.get("/verifyemail",userController.verifyEmail);
route.get("/userlogin",userController.Verified,userController.userLogin);


module.exports=route;