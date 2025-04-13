import Answer from "../../models/answer.js";
import TestQuiz from "../../models/testquiz.js";

export default async function fetchQuizes(req, res) {
    const {user} = req;
    try{
        const quizes = await TestQuiz.find({user: user.id}).populate("topicid","name").select("-createdAt -__v -questions -user").sort({ createdAt: -1 });
        if(!quizes){
            return res.status(404).json({message: "No quizes found"});
        }
        const answers = await Answer.find({user: user.id}).select("questionid answers").sort({ createdAt: -1 });
        const quizWithAnswers = quizes.map((quiz) => {
            const answer = answers.find((ans) => ans.questionid.toString() === quiz._id.toString());
            return {
                ...quiz._doc,
                totalScore: answer ? answer.answers.reduce((acc, ans) => acc + (ans.isCorrect ? 1 : 0), 0) : 0,
            };
        });
        return res.status(200).json({
            quizes: quizWithAnswers,
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}