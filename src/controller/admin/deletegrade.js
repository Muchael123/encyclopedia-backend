import Grade from "../../models/grade.js";
import Topic from "../../models/topic.js";

export default async function DeleteGrade(req, res){
    try {
       const {id} = req.params; 
        if (!id) {
            return res.status(400).json({ message: "Grade ID is required" });
        }

        const topics = await Topic.find({ gradeid: id });
        if(topics.length > 0) {
            await Topic.deleteMany({ gradeid: id });
        }
        const deletedGrade = await Grade.findByIdAndDelete(id);
        if (!deletedGrade) {
            return res.status(404).json({ message: "Grade not found" });
        }

        return res.status(200).json({ message: "Grade deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}