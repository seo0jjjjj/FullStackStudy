const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname + "/.env") });

const SERVER_IP = process.env.SERVER_IP
const SERVER_PORT = process.env.SERVER_PORT
const SERVER_URL = `http://${SERVER_IP}:${SERVER_PORT}`

console.log("[config] search .env from " + __dirname);
console.log("[config] server url : " + SERVER_URL);

module.exports = SERVER_URL