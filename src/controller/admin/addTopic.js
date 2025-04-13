import Joi from "joi";
import Topic from "../../models/topic.js";

const validTopic = Joi.object({
    name: Joi.string().required(),
    subjectid: Joi.string().required(),
    parentid: Joi.string().optional(),
    objectives: Joi.string().required(),
    gradeid: Joi.string().required()
});
export function validateTopic (req, res, next){
    const { error } = validTopic.validate(req.body, {abortEarly: false});
    if (error) {
        return res.status(422).json({
            message: "Invalid details",
            error: error.details.map((err) => err.message),
        });
    }
    next();
}
export default async function AddTopic(req, res){
 const { name, subjectid, parentid, objectives, gradeid } = req.body;
    try {
            const topic = await Topic.create({
                name,
                subjectid,
                parentid,
                objectives,
                gradeid
            });
            return res.status(201).json({
                message: "Topic created successfully",
                topic,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                error: "Internal server error",
            });
        }
}