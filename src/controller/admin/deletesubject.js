import Subject from "../../models/subject.js";
import Topic from "../../models/topic.js";

export default async function deleteSubject(req, res){
    const id = req.params.id;
    try{
        // delete topics when subject is deleted
        const topic = await Topic.find({subjectid: id});
        if(topic){
            await Topic.deleteMany({subjectid: id});
        }
        const subject = await Subject.findByIdAndDelete(id);
        if(!subject){
            return res.status(404).json({message: "Subject not found"});
        }
        return res.status(200).json({message: "Subject deleted successfully"});
    } catch(error){
        console.error(error);
        return res.status(500).json({message: "Internal server error"});
    }
}