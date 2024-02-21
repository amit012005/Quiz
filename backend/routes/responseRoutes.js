import express from "express";
const router = express.Router();
import {
  addResponse,
  getResponse,
  getAllResponse,
} from "../controllers/responseController.js";

router.route("/").post(addResponse);
router.route("/student/:id1/:id2").get(getResponse);
router.route("/faculty/:id").get(getAllResponse);

export default router;
