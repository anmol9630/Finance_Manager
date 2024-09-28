const mongoose=require("mongoose");

const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    status:{
        type:String,
        enum:["pending","completed"],
        default:"pending"
    },
    assignedto:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    duedate:
    {
        type:String,
        required:true
    },
    createdAt:
    {
        type:Date,
        default:Date.now
    }

})

module.exports=mongoose.model('task',taskSchema);