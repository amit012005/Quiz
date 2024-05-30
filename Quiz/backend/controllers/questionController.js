import Exam from "../models/questionModel.js";

const registerExam = async (req, res) => {
  const { title, examCode, instructions, time, creator, duration } = req.body;
  console.log(req.body);

  try {
    const examExists = await Exam.findOne({ examCode });

    if (examExists) {
      console.log("Course already exists");
      return res.status(400).json({ message: "Course already exists" });
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
      return res.status(201).json({
        _id: exam._id,
      });
    } else {
      return res.status(400).json({ message: "Invalid exam data" });
    }
  } catch (error) {
    console.error("Error registering exam:", error);
    res.status(500).json({ message: "Server error" });
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

const deleteQuestion = async (req, res) => {
  try {
    const { id, questionId } = req.params;
    console.log(id);
    console.log(questionId);

    const exam = await Exam.findById(id);

    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }
    exam.multiple = exam.multiple.filter((question) => question._id.toString() !== questionId);
    console.log(exam);
    await exam.save();

    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { registerExam, getExams, deleteExam, addExam ,deleteQuestion};
