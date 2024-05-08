const { MongoClient } = require("mongodb");

async function getDB(url) {
    try {
        const connection = new MongoClient(url).connect();
        Promise.resolve(connection.db);
        console.log("mongodb가 연결되었습니다.");
    } catch (err) {
        console.log("mongodb에 연결할 수 없습니다.");
        Promise.reject(err);
    }
}

module.exports = { getDB };