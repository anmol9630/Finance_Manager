const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    verified:{
        type:Boolean,
        default:false
    },
    roll:{
        type:String,
        enum:["free","premium","admin"],
        default:"free"
    }
})

module.exports=mongoose.model("user",userSchema);