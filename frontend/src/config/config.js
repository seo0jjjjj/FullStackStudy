const SERVER_IP = process.env.REACT_APP_SERVER_IP
const SERVER_PORT = process.env.REACT_APP_SERVER_PORT
const SERVER_URL = `http://${SERVER_IP}:${SERVER_PORT}`

console.log("[config] server url : " + SERVER_URL);

module.exports = SERVER_URL