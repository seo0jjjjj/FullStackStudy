const express = require('express');
const accountRouter = express.Router();

let db;
function initAccountRouter(database) {
    db = database;
}
const acountRouter = ""

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



module.exports = { accountRouter, initAccountRouter };