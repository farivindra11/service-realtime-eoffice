require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const https = require('https')
const fs = require('fs')
const { Server } = require("socket.io");
const cors = require("cors");



const indexRouter = require('./routes/index');

const app = express();

const sslServer = https.createServer({
    key:fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')) , 
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
},app)

global.io = new Server(sslServer, {
  cors: {
    origin: 'http://localhost:3000'
  }
});

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('disconnect', () => {
      console.log(`socket disconnected`);
    })
  });




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/api-gateway/', indexRouter);


sslServer.listen(3443, ()=> console.log('secure server run on port 3443'))

module.exports = app;
