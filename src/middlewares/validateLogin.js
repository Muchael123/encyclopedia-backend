import Joi from "joi"
const valid=Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()

})
export default function ValidateLogin(req,res,next){
    const {error}=valid.validate(req.body,{abortEarly:false});
    if(error){
        return res.status(400).json({ errors: error.details.map(err => err.message) });
    }
    next()
    }
