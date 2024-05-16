require('dotenv').config({ path: "config/keys.env" });

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbClusterURL = process.env.DB_CLUSTER_URL;
const dbDefaults = process.env.DB_DEFAULTS;
const clientIp = process.env.CLIENT_IP;
const clientPort = process.env.CLIENT_PORT;

const clientURL = `http://${clientIp}:${clientPort}`;
console.log(`clientURL : ${clientURL}`);


const dbURL = `mongodb+srv://${dbUser}:${dbPassword}@${dbClusterURL}/${dbDefaults}`;

module.exports = {
  PORT: process.env.PORT || 5000,
  DB_URL: dbURL,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
  JWT_KEY: process.env.JWT_KEY,
  CLIENT_URL : clientURL, 
};
