import Grade from "../../models/grade.js";

export default async function fetchUserGrades(req, res){
    try{
        const grades = await Grade.find().select("-subjects").sort({ createdAt: -1 });
        if(!grades) {
            return res.status(404).json({ message: "No grades found" });
        }
        return res.status(200).json({
            grades,
        });
        
    }catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

