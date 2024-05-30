import Response from "../models/response.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getResponse = async (req, res) => {
  const exams = await Response.find({
    exam: req.params.id1,
    student: req.params.id2,
  });

  res.json(exams);
};
const getAllResponse = async (req, res) => {
  const exams = await Response.find({
    exam: req.params.id,
  });
  console.log(exams);
  res.json(exams);
};

const addResponse = async (req, res) => {
  const {
    finalResponse,
    user_id,
    exam_id,
    attempts,
    total,
    obtain,
    name,
    examName,
  } = req.body;
  console.log("responsecontroller",req.body);
  Response.deleteMany({ exam: exam_id, student: user_id })
    .then(function () {
      console.log("Data deleted"); 
    })
    .catch(function (error) {
      console.log(error); 
    });
  try {
    const response = await Response.create({
      exam: exam_id,
      student: user_id,
      attempts: attempts,
      multiple: finalResponse,
      examName,
      total,
      obtain,
      name,
    });
    if (response) {
        console.log("new data pushed")
      res.status(201).json({
        response,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    console.log(error);
  }
};

export { addResponse, getResponse, getAllResponse };
