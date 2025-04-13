import mongoose from "mongoose";

const PointsSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    questionid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true,
    },
    points: {
        type: Number,
        required: true,
    }
}, { versionKey: false });

const Points = mongoose.model("Points", PointsSchema);
export default Points;