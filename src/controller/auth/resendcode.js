//using Joi, check email and code, if valid, send a new code to the email
import Joi from "joi";
import User from "../../models/user.js";
import sendEmail from "../../lib/sendmail.js";
import generateVerificationCode from "../../lib/gencode.js";

const ResendSchema = Joi.object({
  email: Joi.string().email().required(),
});

export default async function ResendCode(req, res) {
    const { error } = ResendSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ errors: error.details.map((err) => err.message) });
    }
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User email not found" });
    
        if (user.verified) return res.status(400).json({ message: "User already verified" });
    
        const code = generateVerificationCode();
        const expiryTime = new Date();
        expiryTime.setMinutes(expiryTime.getMinutes() + 30);

        user.code.token = code;
        user.code.expiry = expiryTime;
        await user.save();
        await sendEmail(email, "Verification Code", `Your verification code is ${code}`);
        res.status(200).json({ message: "Code resent successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "A server error occurred" });
    }
    }