import express, { Request, Response } from "express";
import { validateQueryParam } from "../middleware/validator";
import { getHotelsByQuery as getHotelsByQueryParam } from "../controllers/hotel";

export const hotelRouter = express.Router();

hotelRouter.get("/hotels", validateQueryParam, getHotelsByQueryParam);

