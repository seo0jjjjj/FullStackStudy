const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const TodoElementRepository = require('./repository/TodoElementRepository');
const TodoElementService = require('./service/TodoElementService');
const TodoElementController = require('./controller/TodoElementController');

let db;
function initRouter(database) {
  //s
  const todoRepo = new TodoElementRepository(database);
  const todoService = new TodoElementService(todoRepo);
  const todoController = new TodoElementController(todoService);
  db = database;


  router.get('/list', todoController.getTodos);

  router.post('/add', async (req, res) => {

    const { content } = req.body;
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


  router.get('/get', async (req, res) => {
    const { id } = req.query
    if (!id) {
      res.status(400).json({ error: "해당 id 값이 비어있습니다." });
      return;
    }

    const todoObject = await db.collection('todoElement').findOne({ _id: new ObjectId(id) })
    res.status(200).json({ content: todoObject?.content });
  })

  router.put('/edit', async (req, res) => {
    const { id, content } = req.body
    const errorMsg = !id ? "잘못된 접근입니다." : "해당 할일이 존재하지 않습니다."

    if (!id) {
      res.status(400).json({ error: errorMsg });
      return;
    }

    await db.collection('todoElement').updateOne({ _id: new ObjectId(id) },
      { $set: { content: content } }).catch(err => {
        res.status(500).res.json({ error: errorMsg });
      }).then(result => {
        // 정상적인 업데이트 완료
        res.status(200).json({ message: "값이 수정되었습니다." });
      })
  });


  router.delete('/delete', async (req, res) => {
    const { id } = req.query
    if (!id) {
      res.status(400).json({ error: "id가 존재하지 않습니다." });
      return;
    }

    await db.collection('todoElement').deleteOne({ _id: new ObjectId(id) })
    res.status(200).json({ message: "삭제되었습니다." });
  })
}


module.exports = { router, initRouter };