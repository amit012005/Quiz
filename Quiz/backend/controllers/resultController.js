import Result from "../models/result.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getResults = async (req, res) => {
  console.log("id from back", req.params.id);
  const results = await Result.find({ student: req.params.id });
//   console.log("results", results);
  res.json(results);
};

const addResult = async (req, res) => {
    const { result, exam_id, user_id, examName } = req.body;
    try {
      await Result.deleteMany({ exam: exam_id, student: user_id });
      console.log("Data deleted"); // Success
  
      const finalresult = await Result.create({
        examName,
        exam: exam_id,
        student: user_id,
        score: result[0],
        maxScore: result[1],
      });
  
      if (finalresult) {
        console.log("resultCpntroller", req.body);
        res.status(201).json({
          finalresult,
        });
      } else {
        res.status(400).json({ message: "Invalid user data" });
      }
    } catch (error) {
      console.log("error occurred", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

export { addResult, getResults };
