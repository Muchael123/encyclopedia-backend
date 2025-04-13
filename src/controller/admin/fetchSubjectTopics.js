import Topic from "../../models/topic.js";


export default async function fetchSubjectTopics(req, res) {
    const { subjectid } = req.params;

    try{
        const topics = await Topic.find({ subjectid }).populate("subjectid").populate("gradeid").populate("parentid").sort({ createdAt: -1 });
        if (!topics || topics.length === 0) {
            return res.status(404).json({
                message: "No topics found",
            });
        }
        return res.status(200).json({
            message: "Topics fetched successfully",
            topics,
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({
            error: "Internal server error",
        });
    }
    
}
