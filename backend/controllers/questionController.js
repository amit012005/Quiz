import Exam from "../models/questionModel.js";

const registerExam = async (req, res) => {
  const { title, examCode, instructions, time, creator, duration } = req.body;
  console.log(req.body);
  const examExists = await Exam.findOne({ examCode });

  if (examExists) {
    res.status(400);
    console.log("hii");
    throw new Error("Course already exists");
  }

  const exam = await Exam.create({
    title,
    examCode,
    instructions,
    time,
    creator,
    duration,
  });

  if (exam) {
    res.status(201).json({
      _id: exam._id,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
};
const getExams = async (req, res) => {
  console.log("questionController");
  try {
    const exams = await Exam.find();
    console.log("exams", exams);
    res.status(200).send(exams); // Corrected status code to 200
  } catch (error) {
    // Added error parameter
    console.error("Failed to fetch exams:", error); // Added error parameter
    res.status(500).send({ error: "Failed to fetch exams" });
  }
};

const deleteExam = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Exam.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Exam deleted successfully" });
    } else {
      res.status(404).json({ message: "Exam not found" });
    }
  } catch (error) {
    console.error("Error deleting exam:", error);
    res.status(201).json({ message: "Internal server error" });
  }
};
const addExam = async (req, res) => {
  const exam = await Exam.findOne({ _id: req.params.id });
  console.log(req.body.question);
  exam.multiple.push(req.body.question);
  await exam.save();
  res.status(200).json(exam);
};

export { registerExam, getExams, deleteExam, addExam };
