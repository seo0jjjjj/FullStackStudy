const express = require('express');
const cors = require('cors');
const app = express();


app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// end
console.log("middleware initalized!");


module.exports = app;