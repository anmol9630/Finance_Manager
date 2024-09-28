const mongoose=require("mongoose");
const userModel=require("../Models/userModel");
const bcrypt=require("bcrypt");

mongoose.connect("mongodb://127.0.0.1:27017/financeManager");

const createAdmin=async()=>{
    const admin=await userModel.findOne({role:"admin"})
    if(admin)
    {
        console.log("admin already exist");
    }
    else{
        const salt =await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash("shivendra486670",salt);
        await userModel.create({
            name:"Shivendra Singh Chandel",
            email:"shivendra486670@gmail.com",
            password:hashedpassword,
            verified:true,
            role:"admin"    
        })
        console.log("Admin Created");
    }
}
createAdmin().then(()=>mongoose.connection.close());