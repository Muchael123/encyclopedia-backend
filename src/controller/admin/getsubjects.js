
import Grade from "../../models/grade.js";
import Subject from "../../models/subject.js";

export default async function GetSubjects(req, res) {
    try {

        const subjects = await Subject.find({}).select("-description").sort({ createdAt: -1 });
        return res.status(200).json({
            subjects,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export async function GetGradeSubjects(req, res){
    const {gradeid} = req.params;
    try{
        const subjects = await Grade.findById(gradeid).populate("subjects").select("-_id -createdAt -updatedAt -__v -description");
        if(!subjects){
            return res.status(404).json({message: "No subjects found"});
        }
        return res.status(200).json({
            subjects: subjects.subjects,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}