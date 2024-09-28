const express=require("express");
const route=express.Router();
const {adminLogin,sendMail,fetchEmail,addTask,fetchTask,updateTask,deleteTask,viewUsers}=require("../Controllers/adminController");

route.post("/adminlogin",adminLogin);
route.post("/viewusers",viewUsers);
route.post("/sendmail",sendMail);
route.get("/fetchemail",fetchEmail);
route.post("/addtask",addTask);
route.get("/fetchtask",fetchTask);
route.post("/updatetask",updateTask);
route.post("/deletetask",deleteTask);



module.exports=route;