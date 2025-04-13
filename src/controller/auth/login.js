import User from "../../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function Login(req, res) {
  try {
    const { password, email } = req.body;
    const user = await User
      .findOne({ email
      });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    };
    if(user.verified === false){
      return res.status(401).json({ message: "Account not verified" });
    }
    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
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
    
  } catch (e) {
    console.log("An error occured", e);
    res.status(500).json({ error: "An error occured. Try again later" });
  }
}