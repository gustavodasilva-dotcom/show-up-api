import { Express, NextFunction, Request, Response } from "express";
import { StatusCodes } from "./models/enums/StatusCodes";

const configRoutes = function (app: Express) {
  const API_PREFIX = "/api";

  app.use((req: Request, _res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });

  app.use(`${API_PREFIX}/images`, require("./routes/images"));

  app.use((_req: Request, res: Response) => {
    res.status(StatusCodes.BadRequest).json({
      error: {
        statusCode: StatusCodes.BadRequest,
      },
      message: "Unmatched route"
    });
  });
};

export default configRoutes;