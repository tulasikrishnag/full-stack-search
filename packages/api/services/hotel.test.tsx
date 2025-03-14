import { describe, it, expect, vi, beforeEach } from "vitest";
import { Db } from "mongodb";
import { getHotelsByQueryParam } from "./hotel";
import { getConnection } from "../lib/db";

// mock the db connection
vi.mock("../lib/db", () => ({
  getConnection: vi.fn(),
}));

describe("getHotelsByQueryParam", () => {
  let mockDb: Db;
  let mockCollection: any;

  beforeEach(() => {
    // create mock collection
    mockCollection = {
      find: vi.fn().mockReturnThis(),
      toArray: vi.fn(),
    };
    // return mock db
    mockDb = {
      collection: vi.fn().mockReturnValue(mockCollection),
    } as unknown as Db;

    (getConnection as vi.Mock).mockResolvedValue(mockDb);
  });

  it("should return hotels for the given query", async () => {
    const query = "Ireland";
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
    mockCollection.toArray.mockResolvedValue(mockHotels);

    const hotels = await getHotelsByQueryParam(query);
    expect(hotels).toEqual(mockHotels);
    expect(mockCollection.find).toHaveBeenCalledWith(
      {
        $or: [
          { hotel_name: new RegExp(query, "i") },
          { chain_name: new RegExp(query, "i") },
          { city: new RegExp(query, "i") },
          { country: new RegExp(query, "i") },
        ],
      },
      {
        projection: {
          hotel_name: 1, 
          city: 1, 
          country: 1, 
          _id: 1, 
        },
      }
    );
  });

  it("should return an empty array if no hotels match", async () => {
    const query = "TEST";

    // Mock the return value of toArray to simulate no results
    mockCollection.toArray.mockResolvedValue([]);

    // Call the function
    const hotels = await getHotelsByQueryParam(query);

    // Assert that the function returned an empty array
    expect(hotels).toEqual([]);
  });

  it("should return hotels from cache", async () => {
    const query = "Ireland";
    await getHotelsByQueryParam(query);
    expect(mockCollection.find).not.toHaveBeenCalledWith(
      {
        $or: [
          { hotel_name: new RegExp(query, "i") },
          { chain_name: new RegExp(query, "i") },
          { city: new RegExp(query, "i") },
          { country: new RegExp(query, "i") },
        ],
      },
      {
        projection: {
          hotel_name: 1,
          city: 1,
          country: 1,
          _id: 1,
        },
      }
    );
  });
});
