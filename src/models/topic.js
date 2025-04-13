
import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    subjectid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true,
    },
    parentid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
    },
    objectives: {
        type: String,
        required: true,
        trim: true,
    },
    gradeid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Grade",
        required: true,
    },
}, { versionKey: false });
const Topic = mongoose.model("Topic", topicSchema);
export default Topic;