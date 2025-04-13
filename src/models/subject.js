import mongoose from "mongoose";
const SubjectSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
}, {versionKey: false});



const Subject = mongoose.model("Subject",SubjectSchema);
export default Subject;

