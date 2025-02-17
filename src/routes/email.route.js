import express from "express";
import { sendEmail } from "../controllers/email.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.post("/send-email", sendEmail);

export default router;
