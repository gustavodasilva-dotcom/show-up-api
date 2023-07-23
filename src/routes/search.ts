import express, { Request, Response } from "express";
import ErrorHandler from "../middlewares/errorHandler";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const query = req.query;

  try {
    console.log(query);
    res.json("OK");
  } catch (error: any) {
    ErrorHandler(error, res);
  }
});

module.exports = router;