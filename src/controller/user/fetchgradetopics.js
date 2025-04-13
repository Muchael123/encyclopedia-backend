import Topic from "../../models/topic.js";

export default async function fetchGradeTopics(req, res){
    const {gradeid, subjectid} = req.params;
    try{
        const Topics = await Topic.find({gradeid, subjectid}).sort({ createdAt: -1 });
        if(!Topics){
            return res.status(404).json({message: "No topics found"});
        }
        return res.status(200).json({
            Topics,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}