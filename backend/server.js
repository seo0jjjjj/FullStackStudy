require('dotenv').config({path: "./keys.env"});
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
cors = require('cors');

const app = express();
let db;

app.listen(5000,()=>{
  console.log("localhost:5000에서 서버 실행중");
})

new MongoClient(process.env.DB_URL).connect().then((client) => {
  console.log("mongo database conneted");
  db = client.db('TodoList');
}).catch((err) => {
  console.log(err);
})

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/list', async (req, res) => {
  let result = await db.collection('todoElement').find().toArray();
  res.json(result);
});

app.post('/add', async (req, res) => {
  console.log(req.body);
  try {
    if (req.body.title == '') {
      res.send("제목을 입력하세요.")
    } else {
      await db.collection('post').insertOne({
        title: req.body.title,
        content: req.body.content
      })
      res.redirect('/list');

    }
  } catch (err) {
    console.err(err);
    res.status(500).send('서버 error');
  }

})

app.get('/detail/:id', async (req, res) => {
  console.log(req.params.id)
  try {
    let result = await db.collection('post').findOne({ _id: new ObjectId(req.params.id) })

    if (result == null) res.status.apply(404).send('url 이 이상함')
    else res.render('detail.ejs', { result: result });
  } catch (err) {
    console.log(err)
    res.status(404).send('url이 이상함')
  }
})

app.get('/edit/:id', async (req,res)=> {
  let result = await db.collection('post').findOne({_id : new ObjectId(req.params.id)})

  console.log(result);
  if(result == null) res.status(404).send('not found');
  else res.render('edit.ejs', {result : result})

})

app.put('/edit', async (req,res)=>{
  await db.collection('post').updateOne({_id: new ObjectId(req.body.id)},
  {$set: {title: req.body.title, content: req.body.content}});
  console.log(req.body);
  res.redirect('/list');
});

app.delete('/delete', async (req,res)=>{
  console.log(req.query)
  await db.collection('post').deleteOne({_id: new ObjectId(req.query.docid)})
  res.send('삭제완료')
})