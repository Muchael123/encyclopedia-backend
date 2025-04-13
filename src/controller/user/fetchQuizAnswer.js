import Answer from "../../models/answer";
import TestQuiz from "../../models/testquiz";

export default async function CheckQuizAnswer(req, res){
    const {user} = req;
    const {quizId} = req.params;
    console.log("Quiz ID:", quizId);
    try{
        const quiz = await TestQuiz.findById(quizId).populate("topicid", "name").select("-createdAt -__v -user");
        if (!quiz) {
            console.log("Quiz not found");
            return res.status(404).json({ message: "Quiz not found" });
        }
        const AnswerExists = await Answer.findOne({questionid: quizId, user: user.id});
        if (!AnswerExists) {
            return res.status(404).json({ message: "Answer not found" });
        }
        // make the quiz to be [{...quiz, answers: AnswerExists.answers}]
        const quizWithAnswers = {
            ...quiz._doc,
            answers: AnswerExists.answers,
        };
        return res.status(200).json({
            message: "Quiz fetched successfully",
            quiz: quizWithAnswers,
        });

    }catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred. Try again later" });
    }
}