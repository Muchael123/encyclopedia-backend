import Joi from "joi";
import Grade from "../../models/grade.js";

const validGrade = Joi.object({
    name: Joi.string().required(),
    subjects: Joi.array().min(1).items(Joi.string()).required(),
})

export const ValidateGrades = (req, res, next) => {
    const { error } = validGrade.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(422).json({
            message: "Invalid details",
            error: error.details.map((err) => err.message),
        });
    }
    next();
}

export default async function AddGrade(req, res){
    const{ name, subjects } = req.body;
    try{
        const grade = await Grade.create({
            name,
            subjects,
        });
        return res.status(201).json({
            message: "Grade created successfully",
            grade,
        });
    } catch(error){
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }

}