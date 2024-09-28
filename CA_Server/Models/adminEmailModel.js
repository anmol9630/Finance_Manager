const mongoose=require("mongoose");
const emailSchema=new mongoose.Schema({
    to:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    body:{
        type:Buffer,
        required:true
    },
    status:{
        type:String,
        enum:["sent","failed","pending"],
        default:"pending",
    },
    errorMessage:{
        type:String,
        default:"No Error"
    },
    sentAt:{
        type:Date,
        default:Date.now
    },
    sentby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    sentto:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
})

module.exports=mongoose.model('email',emailSchema);