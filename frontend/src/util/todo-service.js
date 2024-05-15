const SERVER_URL = require('./../config/config');

const axios = require('axios').default;

const instance = axios.create({
    baseURL: SERVER_URL
});

async function getTodoList() {
    instance.get(`list`)
        .then(function (response) {
            return ['ok', response.data]
        })
        .catch(function (error) {
            // 에러 핸들링
            const response = error.response?.data ?? { error: 'server not response', message: '서버가 응답하지 않습니다.' }
            return ['error', response];
        })
}

getTodoList();


module.exports = {
    getTodoList,
}