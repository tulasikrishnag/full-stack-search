import {getConnection} from '../lib/db'
import { Db } from 'mongodb'
import { cities } from "db/seeds/cities.js";
import { countries } from "./seeds/countries";
import { hotels } from "./seeds/hotels";


export const seedData = async () => {
  try {
    const db:Db =  await getConnection()
    await db.collection("cities").insertMany(cities);
    await db.collection("countries").insertMany(countries);
    await db.collection("hotels").insertMany(hotels);
  } catch (error) {
    console.error("Error seeding database:", error);
  } 
}