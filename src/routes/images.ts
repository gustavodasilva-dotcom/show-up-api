import express, { Request, Response } from "express";

const router = express.Router();

router.get("/:name", async (req: Request, res: Response) => {
  res.json({
    message: "Ok"
  });
});

module.exports = router;