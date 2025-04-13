import Topic from "../../models/topic.js";

export default async function editTopic(req, res) {
    const {id} = req.params;
    const { name, subjectid, parentid, objectives, gradeid } = req.body;
    try{
        const topic = await Topic.findByIdAndUpdate(id, {
            name,
            objectives,
            subjectid,
            gradeid,
            parentid
        }, {new: true});
        if(!topic){
            return res.status(404).json({
                message: "Topic not found",
            });
        }
        return res.status(200).json({
            message: "Topic eddited successfully",
            topic
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
    }