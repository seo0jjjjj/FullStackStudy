const SERVER_URL = require('../../config/config');

const axios = require('axios').default;

axios.get(`${SERVER_URL}/list`)
    .then(function (response) {
        console.log(response.status);
    })
    .catch(function (error) {
        // 에러 핸들링
        console.log(error);
    })