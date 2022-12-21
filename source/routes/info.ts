import express from "express";
import controller from "../controllers/info";
const router = express.Router();

router.get("/:nationalNumber", controller.getNationalNumber);

export default router;
