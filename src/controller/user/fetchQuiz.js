import TestQuiz from "../../models/testquiz.js";

export default async function fetchQuizById (req, res) {
    const { user } = req;
    const { quizId } = req.params;

    try {
        const quiz = await TestQuiz.findOne({ _id: quizId, user: user.id })
            .populate("topicid", "name")
            .select("-createdAt -__v -user");

        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        return res.status(200).json({
            quiz,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}