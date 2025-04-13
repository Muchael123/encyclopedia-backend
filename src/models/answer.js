import mongoose from "mongoose";
const AnswerSchema = new mongoose.Schema({
    questionid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TestQuiz",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    answers : [
        {
            questionId: {type: String, required: true},
            selected: {type: String, required: true},
            isCorrect: {type: Boolean, required: true},
        }
    ],
    topicid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
        required: true,
    },
    score: {
        type: Number,
        default: 0,
    },
})
const Answer = mongoose.model("Answer", AnswerSchema);
export default Answer;