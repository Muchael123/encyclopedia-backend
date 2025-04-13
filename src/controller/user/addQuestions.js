import Joi from "joi";
import Topic from "../../models/topic.js";
import User from "../../models/user.js";
import { generateQuestion } from "../../lib/genquiz.js";
import TestQuiz from "../../models/testquiz.js";

const validQuiz = Joi.object({
    topicid: Joi.string().required(),
    noquiz: Joi.number().optional(),
    noofoptions: Joi.number().optional(),
})


export function validateQuiz(req, res, next){
    const { error }  = validQuiz.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(422).json({
            message: "Invalid details",
            error: error.details.map((err) => err.message),
        });
    }
    next();
}

export default async function AddQuestion(req, res){
 const {topicid, noofoptions=3, noquiz=5} = req.body;
 console.log("Topic id", topicid, noofoptions, noquiz);
 const {user} = req
 try{
    const userDet = await User.findById(user.id);
    if(!user){
        return res.status(404).json({error: "User with these details not found"})
    }
    const topic = await Topic.findById(topicid);
    if(!topic){
        return res.status(404).json({error: "Topic not found"})
    }
    const generatedQuiz = await generateQuestion(topic.name, user.likes, noquiz, noofoptions, topic?.objectives);
    console.log("Generated question",generatedQuiz);
    if(!generatedQuiz){
        return res.status(500).json({error: "We have issues with gemini. Try again later"})
    }
    else{
        console.log(generatedQuiz);
        const testquiz = await TestQuiz.create({
            questions:generatedQuiz,
            user: userDet._id,
            topicid,
            totalPoints: generatedQuiz.length,
            completed: false,
        })
        res.status(201).json({message: "Quiz generated successfully", id: testquiz._id})
    }

 } catch(err){
    console.log(err);
    return res.status(500).json({error: "An error occured. Try again later"})
 }
}