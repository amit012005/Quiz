import express from "express";
const router = express.Router();
import { registerExam ,getExams,deleteExam,addExam,deleteQuestion} from "../controllers/questionController.js";

router.route("/").post(registerExam);
router.route("/").get(getExams);
router.route("/:id").delete(deleteExam);
router.route("/addExam/:id").post(addExam);
router.route("/deleteExam/:id/:questionId").delete(deleteQuestion);
export default router;
