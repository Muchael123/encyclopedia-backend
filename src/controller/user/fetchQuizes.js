import TestQuiz from "../../models/testquiz.js";

export default async function fetchQuizes(req, res) {
    const {user} = req;
    try{
        const quizes = await TestQuiz.find({user: user.id}).populate("topicid","name").select("-createdAt -__v -questions -user").sort({ createdAt: -1 });
        if(!quizes){
            return res.status(404).json({message: "No quizes found"});
        }
        return res.status(200).json({
            quizes,
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}