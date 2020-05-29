const redis = require("redis");
const { RedisConf } = require("../db/conf");

const redisClient = redis.createClient(RedisConf.port, RedisConf.url);
redisClient.on('error', (err) => {
    console.error('err', err);
})
/**
 * get
 * @param {string} key 
 */
let get = (key) => {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                return reject(err);
            }
            if (val == null) {
                return resolve(null)
            } else {
                return resolve(val)
            }
        })
    })
}
/**
 * set
 * @param {string} key 
 * @param {string} val 
 * @param {number} timeout 超时时间
 */
let set = (key, val, timeout = 60 * 60) => {
    redisClient.set(key, val);
    redisClient.expire(key, timeout);
}

module.exports = {
    get,
    set
}