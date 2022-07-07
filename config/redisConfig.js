const redis = require("redis")
require('dotenv').config();
const redisPort = process.env.REDIS_PORT || 6379;

const redisClient = process.env.OS_ENV == "DOCKER" ? redis.createClient({
   host: process.env.REDIS_IP,
   port: redisPort
}) : redis.createClient(redisPort);

module.exports.getRedisAsync = async (key) => {
   const value = await redisClient.get(key);
   return value;
};
module.exports.setRedisAsync = async (key, value) => {
   await redisClient.set(key, value);
};

module.exports.setRedisAsyncEx = async (key, ex, value) => {
   await redisClient.setEx(key, ex, value);
};

module.exports.onConnectCallback = (callback) => {
   redisClient.on('connect', () => {
      // callback();
      console.log("Connected to Redis");
   });
};