import User from "../../models/user.js";

export default async function getUserDetails(req, res) {
   try{
    const userdetails = req.user;
    const user = await User.findById(userdetails.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    
    res.status(200).json({
        username: user.username,
        email: user.email,
        role: user.role,
        verified: user.verified,
        likes: user.likes,
    });
   } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "A server error occurred" });
   }

    
}