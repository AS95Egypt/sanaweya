// packages
import express from "express";
// app
import { getRedisClient } from "../core/redis_client";
import { StudentsDegreesCollection } from "./constants";

export async function cacheMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const seatNo: number = parseInt(req.params.seat_no);
  const client = getRedisClient();

  console.log("get from cache");

  const doc = await client.get(`${StudentsDegreesCollection}:${seatNo}`);
  if (doc) {
    return res.json({ success: true, data: JSON.parse(doc) });
  }
  next();
}
