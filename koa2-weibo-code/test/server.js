const server = require("../src/app").callback();
const request = require("supertest");

module.exports = request(server);