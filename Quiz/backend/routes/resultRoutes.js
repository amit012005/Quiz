import express from "express";
const router = express.Router();
import { addResult, getResults } from "../controllers/resultController.js";

router.route("/").post(addResult);
router.route("/:id").get(getResults);

export default router;
