import Joi from "joi";
import TestQuiz from "../../models/testquiz.js";
import Answer from "../../models/answer.js";


const validAnswer = Joi.object({
    answers: Joi.array().items(Joi.object({
        questionId: Joi.string().required(),
        selected: Joi.string().required(),
    })).required()

});

export const ValidateAnswer = (req, res, next) => {
    const { error } = validAnswer.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(422).json({
            message: "Invalid details",
            error: error.details.map((err) => err.message),
        });
    }
    next();
}

export default async function addQuizAnswers(req, res) {
    const {user} = req;
    const { quizId } = req.params;
    const {answers} = req.body;
    console.log("Quiz ID:", quizId);
    try{
        //chacke if thwere is an answer already for this quiz
        const AnswerExists = await Answer.findOne({questionid: quizId, user: user.id});
        if (AnswerExists) {
            return res.status(400).json({ message: "Answer already exists for this quiz" });
        }
        const quiz = await TestQuiz.findById(quizId).populate("topicid", "name").select("-createdAt -__v -user");
        if (!quiz) {
            console.log("Quiz not found");
            return res.status(404).json({ message: "Quiz not found" });
        }
        if(quiz.completed){
            return res.status(400).json({message: "Quiz already completed"})
        }

        const correctAnswers = quiz.questions.map((question) => question.answer);
        const userAnswers = answers.map((answer) => answer.selected);
        const score = correctAnswers.reduce((acc, answer, index) => {
            return acc + (answer === userAnswers[index] ? 1 : 0);
        }, 0);
        console.log("Score", score);
        //answer.answers + isCorect feature
        const answersWithCorrectness = answers.map((answer, index) => {
            return {
                ...answer,
                isCorrect: answer.selected.trim() === quiz.questions[index].answer.trim(),
            };
        });
        const NewAnswer = await Answer.create({
            user: user.id,
            questionid: quizId,
            answers: answersWithCorrectness,
            score: score,
            topicid: quiz.topicid._id, 
        });
        console.log("Answer submitted successfully", NewAnswer);
        if (!NewAnswer) {
            return res.status(500).json({ message: "Error submitting answers" });
        }
        quiz.completed = true;
        await quiz.save();
        return res.status(201).json({
            message: "Answers submitted successfully",
            score: score,
            quizId: quizId,
            topicid: quiz.topicid._id, 
        });
    }catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}