//require("../db/mongoos");
const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const bcrypt =require("bcryptjs")
const jwd=require("jsonwebtoken");

const usersSchema =new Schema({
    name :{
        type :String,
        required :true
    },
    email :{
        type:String,
        required:true,
        unique:true,   
        trim:true  
  
    },

    password:{
        type:String,
        trim:true,
        required:true
    }
});

usersSchema.pre("save",async function(next){
    const user=this;

    if(user.isModified("password")){
        user.password=await bcrypt.hash(user.password,8);
    }
    next();
});


const user =mongoose.model("User",usersSchema);
module.exports=user;



