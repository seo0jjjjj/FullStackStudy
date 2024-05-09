// config
require('dotenv').config({ path: "./keys.env" });
const DB_URL = process.env.DB_URL;


// express
const express = require('express');
const app = express();

// mongo db
const { ObjectId, MongoClient } = require('mongodb');

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


app.get('/get', async (req,res) => {
  const {id} = req.query
  console.log("/get 요청 [id] : "+ id);
  if(!id){
    res.status(400).json({error : "해당 id 값이 비어있습니다."});
    return;
  }

  const todoObject = await db.collection('todoElement').findOne({ _id : new ObjectId(id)})
  res.status(200).json({content : todoObject?.content});
  console.log("\t /get 응답: ")
  console.log(todoObject)
})

app.put('/edit', async (req, res) => {
  console.log("/edit 업데이트 요청")
  const {id, content} = req.body 
  const errorMsg = !id ? "잘못된 접근입니다." : "해당 할일이 존재하지 않습니다."

  if(!id) {
    res.status(400).json({error : errorMsg});
    return;
  }

  await db.collection('todoElement').updateOne({ _id: new ObjectId(id) },
    { $set: { content: content } }).catch(err=>{
      res.status(500).res.json({error : errorMsg});
    }).then(result => {
      // 정상적인 업데이트 완료
      res.status(200).json({message : "값이 수정되었습니다."});
    })

//
  });


app.delete('/delete', async (req, res) => {
  console.log("/delete 요청")

  const {id} = req.query
  console.log("삭제할 id 값 : " + id);
  if(!id) {
    res.status(400).json({error : "id가 존재하지 않습니다."});
    return;
  }

  await db.collection('todoElement').deleteOne({ _id: new ObjectId(id) })
  res.status(200).json({message : "삭제되었습니다."});
})