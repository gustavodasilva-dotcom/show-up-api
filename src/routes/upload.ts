import express, { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { StatusCodes } from "../models/enums/StatusCodes";
import ErrorHandler from "../middlewares/errorHandler";
import { Image } from "../models/Image";
import imageModel from "../database/models/image";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const files = req.files;

    if (!files) {
      return res.status(StatusCodes.BadRequest).json({
        error: {
          statusCode: StatusCodes.BadRequest
        },
        message: "No files were attached to the request"
      });
    }

    var images: Image[] = [];
    
    const fileNames = Object.keys(files);
    
    fileNames.forEach((key) => {
      const image: UploadedFile = files[key] as UploadedFile;
      
      images.push({
        name: image.name,
        data: image.data,
        contentType: image.mimetype
      });
    });
    
    var hasNamelessImage = false;

    images.map((image) => {
      if (Object.values(image).every(p => !p)) {
        hasNamelessImage = true;
        return false;
      }
    });

    if (hasNamelessImage) {
      return res.status(StatusCodes.BadRequest).json({
        error: {
          statusCode: StatusCodes.BadRequest
        },
        message: "There's a nameless file on the request. All files should be named"
      });
    }

    const promises = images.map(async (image) => {
      return await imageModel.create({
        name: image.name,
        data: image.data,
        contentType: image.contentType
      });
    });

    const result = await Promise.all(promises);

    res.json(result);
  } catch (error: any) {
    ErrorHandler(error, res);
  }
});

module.exports = router;