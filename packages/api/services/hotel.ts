import { Db } from "mongodb";
import { getConnection } from "../lib/db";
import { Hotel } from "../types";
import {getCache,setCache} from "../cache/cache"
export const getHotelsByQueryParam = async (
  query: string
): Promise<Hotel[]> => {
  const getHotelsFromCache = getCache(query);
  if(getHotelsFromCache) {
    console.log("Returning hotels from cache");
    return getHotelsFromCache;
  }
  const db: Db = await getConnection();
  const queryReg = new RegExp(query, "i");
  // when it is production ready and if the data grows for the given matching query, evaluate the options to reduce the load on the back-end
  const hotels = await db
  .collection("hotels")
  .find({
    $or: [
      { hotel_name: queryReg },
      { chain_name: queryReg },
      { city: queryReg },
      { country: queryReg },
    ],
  }, {
    projection: {
      hotel_name: 1,  
      city: 1,        
      country: 1,     
      _id: 1        
    }
  })
  .toArray();
  //store the hotels into cache
  setCache(query,hotels)
  return hotels;
};
