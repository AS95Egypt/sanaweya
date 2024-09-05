"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeRedisClient = initializeRedisClient;
exports.getRedisClient = getRedisClient;
exports.closeRedisConnection = closeRedisConnection;
const redis_1 = require("redis");
let client;
async function initializeRedisClient() {
    if (client) {
        return client;
    }
    client = (0, redis_1.createClient)();
    // {
    // url: "127.0.0.1:6379",
    // // Add any other options you need
    // }
    await client.connect();
    client.on("error", (err) => console.error("Redis Client Error", err));
    client.on("connect", () => console.log("Redis Client Connected"));
    return client;
}
// ? get Redis client instance
function getRedisClient() {
    if (!client) {
        throw new Error("Redis client not initialized. Call initializeRedisClient first.");
    }
    return client;
}
async function closeRedisConnection() {
    if (client) {
        await client.quitAsync();
        client = null;
        console.log("Redis connection closed");
    }
}
