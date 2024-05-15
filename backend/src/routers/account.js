const multer = require('multer');
const express = require('express');
const accountRouter = express.Router();
const bcrypt = require('bcrypt')
const JWT_KEY = require('../../config/config');
const jwt = require('jsonwebtoken');
const fs = require('fs');

// uploads폴더가 없으면 생성하기
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

let db;
function initAccountRouter(database) {
    db = database;
}

/** 해당 아이디가 존재하는 지 중복 검사 */
accountRouter.get("/check-username-dup", async (req, res) => {
    const { username } = req.query;

    // username을 안넘겼을 때,
    if (!username) {
        res.status(403).json({ error: "Wrong Access", message: "잘못된 접근입니다." })
    }

    const response = await db.collection('account').findOne({ username: username })

    console.log(!!response);

    res.status(200).json({ hasAccount: !!response });
})

/*회원가입 */

accountRouter.post("/register", upload.single('profile'), async (req, res) => {
    const { username, password, nickname } = req.body;

    let hashPW = await bcrypt.hash(password, 10)
    const imgPath = !req.file ? '' : '/' + req.file.path;
    console.log("image location :" + imgPath);
    try {
        const response = await db.collection("account").insertOne({
            username: username,
            password: hashPW,
            nickname: nickname,
            imgURL: imgPath
        })
        res.status(200).json({ message: "회원가입이 완료되었습니다." })
    } catch (err) {
        res.status(400).json({ error: "db insert Error", message: "회원가입 등록 오류" })
    }
})


/* 로그인 */
accountRouter.post('/login', async (req, res) => {
    let result = await db.collection('account').findOne({ username: req.body.username })
    if (!result) {
        res.status(400).json({ message: '아이디 또는 비밀번호가 일치하지 않습니다.' })
    }
    if (await bcrypt.compare(req.body.password, result.password)) {
        // 유저가 인증되었으면 JWT 토큰 생성
        const token = jwt.sign({ id: result._id, username: result.username },
            JWT_KEY.toString(), { expiresIn: '1h' });
        // 쿠키에 토큰 설정 // secure: true는 HTTPS에서만 작동합니다.
        res.cookie('auth_token', token, { httpOnly: true, secure: false });

        // 리다이렉트
        res.status(200).json({ message: `${result?.nickname ?? result?.username} 님 반갑습니다.` });
    } else {
        res.status(400).json({ message: '아이디 또는 비밀번호가 일치하지 않습니다.' })
    }
})


module.exports = { accountRouter, initAccountRouter };