const express = require('express');
const cors = require('cors');
const server = express();

server.use(express.json())
server.use(cors())

let port = 3500;

const getPictures = require('./getPictures');

server.get('', getPictures);

server.listen(port, console.log('server running at port: ' + port));

