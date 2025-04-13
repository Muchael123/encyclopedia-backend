import { Router } from "express";
import register from "../controller/auth/register.js";
import ValidateReg from "../middlewares/ValidateReg.js";
import HashPassword from "../middlewares/hashpass.js";
import ValidateLogin from "../middlewares/validateLogin.js";
import Login from "../controller/auth/login.js";
import ValidateCode from "../controller/auth/validatecode.js";
import ResendCode from "../controller/auth/resendcode.js";

const router=Router()

router.post("/register",ValidateReg,HashPassword,register);
router.post("/login", ValidateLogin, Login);
router.post("/validate-code", ValidateCode);
router.post("/resend-code", ResendCode);
export default router