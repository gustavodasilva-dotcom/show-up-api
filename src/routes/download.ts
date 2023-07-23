import express, { Request, Response } from "express";
import imageModel from "../database/models/image";
import ErrorHandler from "../middlewares/errorHandler";
import { StatusCodes } from "../models/enums/StatusCodes";

const router = express.Router();

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const image = await imageModel.findById(id);
    
    if (!image) {
      return res.status(StatusCodes.BadRequest).json({
        error: {
          statusCode: StatusCodes.BadRequest
        },
        message: `No image was found for the id ${id}`
      });
    }
    
    res.writeHead(StatusCodes.Ok, {
      'Content-Disposition': `attachment; filename="${image.name}"`,
      'Content-Type': image.contentType
    });

    res.end(image.data);
  } catch (error: any) {
    ErrorHandler(error, res);
  }
});

module.exports = router;