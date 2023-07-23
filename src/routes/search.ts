import express, { Request, Response } from "express";
import ErrorHandler from "../middlewares/errorHandler";
import { StatusCodes } from "../models/enums/StatusCodes";
import imageModel from "../database/models/image";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const query = req.query;

  try {
    if (Object.keys(query).length === 0) {
      return res.status(StatusCodes.BadRequest).json({
        error: {
          statusCode: StatusCodes.BadRequest
        },
        message: "No query was sent at the request"
      });
    }

    const data = await imageModel.aggregate(
      [
        { "$match": { "tags.name": { "$gte": "coco" } } }
      ]
    );
    console.log(data);

    const statusCode = data.length === 0 ? StatusCodes.NoContent : StatusCodes.Ok;

    res.status(statusCode).json(data);
  } catch (error: any) {
    ErrorHandler(error, res);
  }
});

module.exports = router;