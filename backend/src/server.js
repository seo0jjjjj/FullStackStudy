const app = require('./middlewares');
const { getDb, connectMongoDB } = require('./db');
const { router, initIndexRouter } = require('./routers');
const { DB_URL, PORT, DB_NAME } = require('../config/config');
const { initAccountRouter, accountRouter } = require('./routers/account');

async function run() {

  // db connection
  await connectMongoDB(DB_URL, DB_NAME);

  // routing
  initIndexRouter(getDb());
  initAccountRouter(getDb());

  app.listen(PORT, () => {
    console.log(`localhost:${PORT} 에서 서버 실행중`);
  });

  app.use(router);
  app.use("/account", accountRouter);
}

run();