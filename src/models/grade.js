import mongoose from "mongoose";
const GradeSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true,
    }]
}, {versionKey: false});

const Grade = mongoose.model("Grade",GradeSchema);
export default Grade;