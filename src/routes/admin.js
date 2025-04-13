import { Router } from "express";
import AddSubject, { validateSubject } from "../controller/admin/addsubject.js";
import validateAdmin from "../middlewares/validateadmin.js";
import GetSubjects from "../controller/admin/getsubjects.js";
import deleteSubject from "../controller/admin/deletesubject.js";
import FetchGrades from "../controller/admin/fetchgrade.js";
import AddGrade, { ValidateGrades } from "../controller/admin/addgrade.js";
import DeleteGrade from "../controller/admin/deletegrade.js";
import validateUser from "../middlewares/validateuser.js";
import AddTopic,{ validateTopic} from "../controller/admin/addTopic.js";
import fetchSubjectTopics from "../controller/admin/fetchSubjectTopics.js";
import editTopic from "../controller/admin/editTopic.js";
import deleteTopic from "../controller/admin/deleteTopic.js";

const router = Router();
//grade
router.post("/grades",validateAdmin, ValidateGrades,AddGrade );
router.delete("/grades/:id",validateAdmin,  DeleteGrade);
router.get("/grades",validateUser, FetchGrades);


//subject
router.post("/subjects",validateAdmin, validateSubject, AddSubject);
router.get("/subjects",validateUser,GetSubjects);
router.delete("/subjects/:id",validateAdmin, deleteSubject);

//topic
router.post("/topics", validateAdmin,validateTopic, AddTopic);
router.get("/topics/:subjectid", validateUser, fetchSubjectTopics);
router.put("/topics/:id", validateAdmin, validateTopic, editTopic);
router.delete("/topics/:id", validateAdmin, deleteTopic);

export default router;