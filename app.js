require('dotenv').config();
const express = require('express');
const path = require('path');
const https = require('https')
const fs = require('fs')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { Server } = require("socket.io");

const indexRouter = require('./routes/index');

const app = express();
const sslServer = https.createServer({
    key:fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')) , 
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
},app)
const io = new Server(sslServer);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api-gateway/', indexRouter);

io.on('connection', (socket) => {
    console.log('a user connected');
  });


sslServer.listen(3443, ()=> console.log('secure server run on port 3443'))


module.exports = app;
