// config
require('dotenv').config({ path: "./keys.env" });
const DB_URL = process.env.DB_URL;


// express
const express = require('express');
const app = express();

// mongo db
const { ObjectId, MongoClient } = require('mongodb');

// cors middleware
cors = require('cors');

app.listen(5000, () => {
  console.log("localhost:5000 에서 서버 실행중");
})

let db;
new MongoClient(DB_URL).connect().then(client => {
  db = client.db("TodoList")
  console.log("mongodb가 연결되었습니다.");
}).catch((err) => {
  console.log("mongodb에 연결할 수 없습니다.");
  throw err;
});

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/list', async (req, res) => {
  let result = await db.collection('todoElement')
    .find()
    .toArray()
  res.status(201).json(result);

});

app.post('/add', async (req, res) => {

  const { content } = req.body;
  console.log("[add] request from client: ", req.body?.content);

  if (!content) {
    const errorMsg = !content ? "할 일을 입력해주세요." : "잘못된 접근입니다.";
    return res.status(400).json({ error: errorMsg });
  }

  const response = await db.collection('todoElement').insertOne({
    content: req.body.content
  })

  try {
    const response = await db.collection('todoElement').insertOne({ content });
    res.status(200).json({
      message: "데이터가 정상적으로 입력됨.",
      id: response.insertedId
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to insert data" });
  }
});


app.put('/edit', async (req, res) => {
  await db.collection('post').updateOne({ _id: new ObjectId(req.body.id) },
    { $set: { title: req.body.title, content: req.body.content } });
  console.log(req.body);
  res.redirect('/list');
});

app.delete('/delete', async (req, res) => {
  console.log(req.query)
  await db.collection('post').deleteOne({ _id: new ObjectId(req.query.docid) })
  res.send('삭제완료')
})