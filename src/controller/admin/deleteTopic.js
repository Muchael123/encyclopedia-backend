import Topic from "../../models/topic.js";

export default async function deleteTopic(req, res) {
    const id = req.params.id;
    try {
        const topic = await Topic.findByIdAndDelete(id);
        if (!topic) {
            return res.status(404).json({ message: "Topic not found" });
        }
        return res.status(200).json({ message: "Topic deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}