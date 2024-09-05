"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheMiddleware = cacheMiddleware;
// app
const redis_client_1 = require("../core/redis_client");
const constants_1 = require("./constants");
async function cacheMiddleware(req, res, next) {
    const seatNo = parseInt(req.params.seat_no);
    const client = (0, redis_client_1.getRedisClient)();
    console.log("get from cache");
    const doc = await client.get(`${constants_1.StudentsDegreesCollection}:${seatNo}`);
    if (doc) {
        return res.json({ success: true, data: JSON.parse(doc) });
    }
    next();
}
