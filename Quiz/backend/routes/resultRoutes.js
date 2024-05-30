import express from "express";
const router = express.Router();
import { addResult, getResults } from "../controllers/resultController.js";


router.route("/:id").get(getResults);
router.route("/").post(addResult);

export default router;
