import mongoose from "mongoose";
const UserSchema=new mongoose.Schema({
    username:{
        type: String,
    required: true,
    trim: true,
},
email:{
    type: String,
required: true,
trim: true,
unique: true,
},
password:{
    type: String,
required: true,
trim: true,
},
role:{
    type: String,
required: true,
enum:[ "admin", "normal"],
default: "normal",
},
verified:{
    type:Boolean,
    default: false,
},
code:{
    token:{type:Number},
    expiry:{type: Date}, 
    },
    likes:{
        type:[String],
        default: [],
    },
    
})
const User = mongoose.model("User",UserSchema);
export default User;