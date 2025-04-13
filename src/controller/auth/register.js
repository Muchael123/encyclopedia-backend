import generateVerificationCode from "../../lib/gencode.js";
import sendEmail from "../../lib/sendmail.js";
import User from "../../models/user.js";

export default async function register(req,res){
    
    console.log(req.body)
    const {email, password, username} = req.body;
    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({error: "User already exists"});
        }
        const code=generateVerificationCode()
    const expiryTime = new Date();
    expiryTime.setMinutes(expiryTime.getMinutes() + 30);
    const NewUser = await User.create({username,email,password, code:{token:code, expiry: expiryTime}})
    res.status(200).json({masage:`user ${NewUser?.username} created successfully`})
    sendEmail(email, "Welcome to Techer Bomba", `Your code is ${code}. It expires in 30 mins`)
    } catch(error){
        console.error(error);
        return res.status(500).json({error: "Internal server error"});
    }
}