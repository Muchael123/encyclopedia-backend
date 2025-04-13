import Joi from "joi";
import Subject from "../../models/subject.js";
const validSubject = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    
});

export const validateSubject = (req, res, next) => {
    const { error } = validSubject.validate(req.body, {abortEarly: false});
    if (error) {
        return res.status(422).json({
            message: "Invalid details",
            error: error.details.map((err) => err.message),
        });
    }
    next();
};

export default async function AddSubject(req, res) {
    const { name, description } = req.body;
    try {
        const subject = await Subject.create({
            name,
            description,
        });
        return res.status(201).json({
            message: "Subject created successfully",
            subject,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}