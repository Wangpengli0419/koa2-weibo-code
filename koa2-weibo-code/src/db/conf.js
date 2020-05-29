const env = require("../utils/env")
let MongoConf = {
    url: 'mongodb://localhost:',
    port: '27018'
}
if (env.isDev) {
    MongoConf = {
        url: 'mongodb://localhost:',
        port: '27017'
    }
}
module.exports = { MongoConf }