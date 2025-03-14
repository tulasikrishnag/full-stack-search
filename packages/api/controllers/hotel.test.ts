import { describe, it, expect, vi, beforeEach } from "vitest";
import { Request, Response } from "express";
import { getHotelsByQuery } from "./hotel";
import { getHotelsByQueryParam } from "../services/hotel";

// Mock the service layer
vi.mock("../services/hotel", () => ({
  getHotelsByQueryParam: vi.fn(),
}));

describe("getHotelsByQuery controller", () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    // Create mock request and response
    req = {
      query: {
        query: "Ireland",
      },
    } as unknown as Request;
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;
  });

  it("should return hotels matching the query", async () => {
    const mockHotels = [
      {
        hotel_name: "Sai Kaew Beach Resort",
        city: "Koh Samet",
        country: "Thailand",
      },
      {
        hotel_name: "Marine Hotel",

        city: "Dublin",

        country: "Ireland",
      },
    ];

    // mock the service to return mock hotels
    (getHotelsByQueryParam as vi.Mock).mockResolvedValue(mockHotels);
    await getHotelsByQuery(req, res);
    expect(getHotelsByQueryParam).toHaveBeenCalledWith("Ireland");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockHotels);
  });

  it("should return 500 if an error occurs in the service", async () => {
    // mock the service to throw an error
    (getHotelsByQueryParam as vi.Mock).mockRejectedValue(
      new Error("Database Error")
    );

    await getHotelsByQuery(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to retrieve hotels",
    });
  });
});
