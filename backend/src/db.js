const { ObjectId, MongoClient } = require('mongodb');

let db;

/**
 * 해당 URL과 데이터베이스 이름을 통해 연결함.
 * @param {url} mongoDB_URL  
 * @param {DB_NAME} database이름  
 */
async function connectMongoDB(url,DB_NAME){ 
  try{
  const client = await new MongoClient(url).connect();
  db = client.db(DB_NAME)
  console.log("mongodb가 연결되었습니다.");

  }catch(err){
  console.log("mongodb에 연결할 수 없습니다.");
  console.log("url : " + url);
  console.log("dbName : " + DB_NAME);
  throw err;
  }
}

function getDb() {
  if (!db) {
    throw new Error("데이터 베이스가 연결되지 않았습니다.");
  }
  return db;
}

module.exports = { connectMongoDB, getDb}