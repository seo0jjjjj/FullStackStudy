const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');


const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000', // 출처 허용 옵션
    credential: 'true' // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
}));
// 정적 파일 제공 설정
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// end
console.log("middleware initalized!");


module.exports = app;