const app = require('./middlewares');
const { getDb, connectMongoDB } = require('./db');
const { router, initRouter } = require('./routers/router');
const {DB_URL, PORT, DB_NAME} = require('../config/config')

async function run() {
  
  // db connection
  await connectMongoDB(DB_URL,DB_NAME);
  
  // routing
  initRouter(getDb());

  app.listen(PORT, () => {
    console.log(`localhost:${PORT} 에서 서버 실행중`);
  });

  app.use(router);
}

run();