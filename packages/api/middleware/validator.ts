import { Request, Response, NextFunction } from "express";
import { QueryParam } from "../types";

export const validateQueryParam = (
  req: Request<{}, {}, {}, QueryParam>,
  res: Response,
  next: NextFunction
): void => {
  const { query } = req.query;
  if (!query) {
    res.status(400).json({ message: "query param is required" });
    return;
  }
  //remove special characters and trim empty spaces
  req.query.query = query.replace(/[^\w\s]/gi, "").replace(/\s+/g, " ").trim();
  next();
};
