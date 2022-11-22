const express = require('express');
const cors = require('cors');
const server = express();
const port = 3500;
server.use(express.json())
server.use(cors())


const getPictures = require('./getPictures');

server.get('', getPictures);

server.listen(port, console.log('server running at port: ' + port));

