import Joi from "joi";
import User from "../../models/user.js";
import jwt from "jsonwebtoken";
const ConfSchema = Joi.object({
    email: Joi.string().email().required(),
    code: Joi.number().required()
})
export default async function ValidateCode(req, res){
 const {error} = ConfSchema.validate(req.body,{abortEarly:false});
 if(error){
     return res.status(400).json({ errors: error.details.map(err => err.message) });
 }
 const {email, code} = req.body;
 const time = new Date()
 
 try{
    const user = await User.findOne({
       email 
    })
    if(!user)
        return res.status(404).json({ message: "User email not found" }); 
    if(user?.code?.token !== code)
        return res.status(401).json({error: "Invalid code"})
    if(user?.code?.expiry < time)
        return res.status(401).json({error: "Token expired"})
    user.code = {};
    user.verified = true;
    await user.save();
     const token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "30d" }
        );
        res.status(200).json({
          message: "Login successful",
          token,
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            
          },
        });
 } catch(err){
    console.log(err)
    return res.status(500).json({error: "A server error occured"})
 }

}