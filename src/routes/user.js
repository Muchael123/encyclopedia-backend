import { Router } from "express";
import getUserDetails from "../controller/user/getUSerDetails.js";
import validateUser from "../middlewares/validateuser.js";
import AddQuestion, { validateQuiz } from "../controller/user/addQuestions.js";
import fetchUserGrades from "../controller/user/fetcUserGrades.js";
import { GetGradeSubjects } from "../controller/admin/getsubjects.js";
import fetchGradeTopics from "../controller/user/fetchgradetopics.js";
import fetchQuizes from "../controller/user/fetchQuizes.js";
import fetchQuizById from "../controller/user/fetchQuiz.js";
import addQuizAnswers, { ValidateAnswer } from "../controller/user/AddQuizAnswers.js";
const router=Router()
router.use(validateUser)
router.post("/likes", async (req, res) => {
    res.status(200).json({message: "Hello from likes"})
})

router.get("/", getUserDetails);


//grade
router.get("/grades", fetchUserGrades);

//subject

router.get("/subjects/:gradeid", GetGradeSubjects);

//topics
router.get("/topics/:subjectid/:gradeid",fetchGradeTopics);

// questions
router.get("/questions", fetchQuizes);
router.post("/genquiz", validateQuiz, AddQuestion);
router.get("/quiz/:quizId", fetchQuizById);
router.post("/answers/:quizId",ValidateAnswer, addQuizAnswers);
// router.get("/answers/:quizId", );


export default router 