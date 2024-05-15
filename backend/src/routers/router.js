const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

let db;
function initRouter(database) {
  db = database;
}

/**
 * Todo 리스트 반환
 */
router.get('/list', async (req, res) => {
  let result = await db.collection('todoElement')
    .find()
    .toArray()
  res.status(201).json(result);
});

router.post('/add', async (req, res) => {

  const { content } = req.body;
  console.log("[add] request from client: ", req.body?.content);

  if (!content) {
    const errorMsg = !content ? "할 일을 입력해주세요." : "잘못된 접근입니다.";
    return res.status(400).json({ error: 'invaild Access', message: errorMsg });
  }

  try {
    const response = await db.collection('todoElement').insertOne({ content });
    res.status(200).json({
      message: "추가되었습니다.",
      id: response.insertedId
    });
  } catch (error) {
    res.status(500).json({ error: "insert error", message: "데이터베이스 추가 오류" });
  }
});


router.get('/get', async (req, res) => {
  const { id } = req.query
  console.log("/get 요청 [id] : " + id);

  // 아이디가 "" 일 경우,
  if (!id) {
    res.status(400).json({ error: "empty Id", message: "해당 id 값이 비어있습니다." });
    return;
  }

  const todoObject = await db.collection('todoElement').findOne({ _id: new ObjectId(id) })
  res.status(200).json({ content: todoObject?.content });
  console.log("\t /get 응답: ")
  console.log(todoObject)
})

router.put('/edit', async (req, res) => {
  console.log("/edit 업데이트 요청")
  const { id, content } = req.body
  const errorMsg = !id ? "잘못된 접근입니다." : "해당 할일이 존재하지 않습니다."

  // id가 ""일 경우,
  if (!id) {
    res.status(400).json({ error: 'empty id', message: errorMsg });
    return;
  }

  // Update 진행
  await db.collection('todoElement')
    .updateOne({ _id: new ObjectId(id) },
      { $set: { content: content } })
    // update Error
    .catch(err => {
      res.status(500).res.json({ error: "not found", message: errorMsg });
      // 업데이트 성공
    }).then(result => {
      res.status(200).json({ message: "값이 수정되었습니다." });
    })

  //
});


router.delete('/delete', async (req, res) => {
  console.log("/delete 요청")

  const { id } = req.query
  console.log("삭제할 id 값 : " + id);
  if (!id) {
    res.status(400).json({ error: "not found", message: "해당 id가 존재하지 않습니다." });
    return;
  }

  await db.collection('todoElement').deleteOne({ _id: new ObjectId(id) })
  res.status(200).json({ message: "삭제되었습니다." });
})

module.exports = { router, initRouter };