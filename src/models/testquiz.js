
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    questions: [
       { question: {
            type: String,
            required: true,
          },
          answer: {
            type: String,
            required: true,
          },
          options: {
            type: [String],
            required: true,
          },
          level: {
            type: String,
            enum: ['easy', 'intermediate', 'hard'],
            required: true,
          },
        }
    ],
   
   
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    topicid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topic',
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    totalPoints: {
      type: Number,
      default: 0,
    }
  }, { versionKey: false });

const TestQuiz = mongoose.model("TestQuiz", questionSchema);
export default TestQuiz;