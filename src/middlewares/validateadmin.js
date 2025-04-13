//verify jwt set user to userdet
import jwt from "jsonwebtoken";

export default function validateAdmin(req, res, next) {
    if(!req?.header('Authorization')) {
        return res.status(401).json({message: "Access denied. No token provided"});
    }
    const token = req?.header('Authorization').split(' ')[1];

    if(!token) {
        return res.status(401).json({message: "Access denied. No token provided"});
    }
    try{
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        if(req.user.role !== "admin"){
            return res.status(403).json({message: "Access denied. Not an admin"});
        }
        next();
    }
    catch(e){
        return res.status(401).json({message: "Invalid token"});
    }
    }