const userModel=require("../Models/userModel");
const bcrypt=require("bcrypt");
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { ErrorHandler } = require("../utils/ErrorHandlerClass");
const zlib=require("zlib");
const emailModel=require("../Models/adminEmailModel");
const taskModel=require("../Models/adminTaskModel");



const adminLogin=async(req,res,next)=>{
    const {email,password}=req.body;
    try{
    const admindata=await userModel.findOne({email:email});
    if(!admindata){
       return next(new ErrorHandler(error.message || "Invalid input",400));
    }
    const validpassword=await bcrypt.compare(admindata.password,password);
    if(!validpassword)
    {
     return next(new ErrorHandler(error.message || "Invalid input",400));
    }
    const token=jwt.sign({id:admindata._id,name:admindata.name},process.env.JWT_SECRET_KEY,{expiresIn:'90d'});
 
    res.cookie('admin',token,{
     httpOnly:true,
     secure: process.env.NODE_ENV === 'production',
     sameSite: 'Strict', 
     maxAge: 90 * 24 * 60 * 60 * 1000
    });
    res.status(200).json({message:"You have logged in successfully"})
    } catch(error){
     return next(new ErrorHandler(error.message || "Internal server error",500));
    }
 }


 const viewUsers=async(req,res,next)=>{
     try{
        const user=await userModel.find({"role":{$not:"admin"}}).select('-password');
        res.status(200).json(user);
     } catch(error)
     {
        return next(new ErrorHandler(error.message || "Internal server error",500));
     }

 }


 const sendMail=async(req,res,next)=>{
      const {to,subject,body,sentby,sentto}=req.body;
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

       const mailoptions={
        from: 'chandel486670@gamil.com',
        to: to,
        subject:subject,
        text: body
      }
      try{
        const emaildata=await transporter.sendMail(mailoptions);

        const compressedBody = zlib.gzipSync(body);
        await emailModel.create({
            to:to,
            subject:subject,
            body:compressedBody,
            status:"sent",
            sentAt:Date.now(),
            sentby:sentby,
            sentto:sentto
        })
        res.status(200).json({message:"email sent and saved in database"});
      } catch(error){
        const compressedBody=zlib.gzipSync(body);
        await emailModel.create({
            to:to,
            subject:subject,
            body:compressedBody,
            status:"failed",
            sentAt:Date.now(),
            errorMessage:error.message,
            sentby:sentby,
            sentto:sentto
        })
        return next(new ErrorHandler(error.message || "Error occured",500));
      }
 }



 const fetchEmail=async(req,res,next)=>{
    try{
        const email=await emailModel.find();
        const decompressedbody=zlib.gunzipSync(email.body).toString('utf-8');
        res.status(200).json({
            to: email.to,
            subject: email.subject,
            body: decompressedbody, 
            status: email.status,
            errorMessage:email.errorMessage,
            sentAt: email.sentAt,
            sentby: email.sentby,
            sentto: email.sentto,
        });

    }catch(error){
        return next(new ErrorHandler(error.message || "Internal server error",500));
    }
 }



 const addTask=async(req,res,next)=>{
    const {title,description,duedate,assignedto}=req.body;
    try{
        await taskModel.create({
            title:title,
            description:description,
            duedate:duedate,
            assignedto:assignedto
        })
        res.status(200).json({message:"Task created successfully"});
    } catch(error){
        return next(new ErrorHandler(error.message|| "Intenal server error",500));
    }
 }



 const fetchTask=async(req,res,next)=>{
       const {id}=req.body;
       try{
        const task=await taskModel.findById(id);
        res.status(200).json(task);
       }catch(error)
       {
        return next(new ErrorHandler(error.message || "No task",400));
       }
 }


 const updateTask=async(req,res,next)=>{
    const {taskid}=req.body;
    try{
        const task=await taskModel.findById(taskid);
        task.status="completed";
        await task.save();
        res.status(200).json({message:"Task updated successfully"});
    } catch(error){
        return next(new ErrorHandler(error.message || "Internal server error",500));
    }
 }



 const deleteTask=async(req,res,next)=>{
    const {taskid}=req.body;
    try{
        const task=await taskModel.findByIdAndDelete(taskid);
        res.status(200).json({message:"Task deleted"});
    } catch(error){
        return next(new ErrorHandler(error.message || "Internal server error",500));
    }
 }


 module.exports={
    adminLogin,
    viewUsers,
    sendMail,
    addTask,
    fetchTask,
    updateTask,
    deleteTask,
    fetchEmail
 }