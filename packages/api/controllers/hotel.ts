import { Request, Response } from "express";
import { getHotelsByQueryParam } from "../services/hotel";
import { QueryParam } from "../types";

export const getHotelsByQuery = async (
  req: Request<{}, {}, {}, QueryParam>,
  res: Response
): Promise<void> => {
  try {
    const { query } = req.query;
    const hotels = await getHotelsByQueryParam(query);
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve hotels" });
  }
};
