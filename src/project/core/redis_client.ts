import { createClient } from "redis";

let client: any;

export async function initializeRedisClient() {
  if (client) {
    return client;
  }

  client = createClient();
  // {
  // url: "127.0.0.1:6379",
  // // Add any other options you need
  // }

  await client.connect();

  client.on("error", (err: Error) => console.error("Redis Client Error", err));
  client.on("connect", () => console.log("Redis Client Connected"));

  return client;
}

// ? get Redis client instance
export function getRedisClient() {
  if (!client) {
    throw new Error(
      "Redis client not initialized. Call initializeRedisClient first."
    );
  }
  return client;
}

export async function closeRedisConnection() {
  if (client) {
    await client.quitAsync();
    client = null;
    console.log("Redis connection closed");
  }
}
