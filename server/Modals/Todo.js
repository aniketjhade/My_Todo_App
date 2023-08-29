const mongoose=require("mongoose");


const TodoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    completed:{
        type:String,
    },
    pending:{
        type:String,
    }
},{
    timestamps:true,
});

module.exports=mongoose.model("todo",TodoSchema);