const env = require('../utils/env');
let MongoConf = {
    url: 'mongodb://localhost:',
    port: '27018'
};

let RedisConf = {
    url: '127.0.0.1',
    port: 6379
};
if (env.isDev) {
    MongoConf = {
        url: 'mongodb://localhost:',
        port: '27017'
    };
}
module.exports = { MongoConf, RedisConf };