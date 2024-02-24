import mongoose, { Schema } from "mongoose";

var MCQ = new Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
});

const responseSchema = new Schema(
  {
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    examName: {
      type: String,
      required: true,
    },
    attempts: {
      type: String,
      default: "",
    },
    total: {
      type: Number,
      required: true,
    },
    obtain: {
      type: Number,
      required: true,
    },
    multiple: [MCQ],
  },
  {
    timestamps: true,
  }
);

var Response = mongoose.model("Response", responseSchema);

export default Response;
