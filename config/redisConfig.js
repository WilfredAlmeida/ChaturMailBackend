const redis = require("redis")
require('dotenv').config()
const redisPort = process.env.REDIS_PORT || 6379
const redisClient = redis.createClient(redisPort);
// module.exports.redisClient = redis.createClient(redisPort);

(async () => {
   redisClient.on('error', (err) => console.log(err));
   await redisClient.connect();
})();

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

// module.exports= const onConnectCallback = (callback) => {
//    redisClient.on('connect', () => {
//    callback();
//   });
// };