require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const path = require('path');
const https = require('https')
const fs = require('fs')
const { Server } = require("socket.io");
const apiAdapter = require('./_helpers/apiAdapter')


const { API_GATEWAY_EOFFICE, REACT_PROXY } = process.env;
const api = apiAdapter(API_GATEWAY_EOFFICE);

const indexRouter = require('./routes/index');
const app = express();

const sslServer = https.createServer({
  rejectUnauthorized: false,
  key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
}, app)


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/api-gateway', indexRouter);

global.io = new Server(sslServer, {     //=============== proxy ====================
  cors: {
    origin: REACT_PROXY
  }
});


const addNewUser = async (data, socketId) => {    //===================== add new user online ==============
  try {
    const userData = await api.get('/user-online')
    const dataUser = userData.data.data

    !dataUser.some((user) => user.username === data.user) && await api.post('/user-online', {
      username: data.user,
      kode_opd: data.socketId,
      socketId: socketId
    })

  } catch (error) {
    console.error(error);
  }
}

const removeUser = async (socketId) => {      //========================= remove user online ===========
  try {
    const userData = await api.get('/user-online')
    const dataUser = userData.data.data
    dataUser.forEach(async (element) => {

      if (element.socketId === socketId) {
        const id = element.id
        await api.delete(`/user-online/${id}`)
      }

    });

  } catch (error) {
    console.error(error);
  }

}

const getUser = async (opdPenerima) => {     //============================== GET user online ====================
  const data = await api.get('/user-online')
  const resp = data.data.data

  return resp.find((user) => user.kode_opd === opdPenerima)
}

//================ connection socket.io ===============
io.on('connection', (socket) => {     
  console.log('user connected')

  socket.on("newUser", (data) => {    //================ add user connected ================
    addNewUser(data, socket.id)
  })

  socket.on("sendNotif", ({ sender, opdPenerima, pesan, type, id_surat }) => {    //============== take event from socket client ===============
    const receiver = getUser(opdPenerima);

    receiver.then(async (res) => {
      if (res) {
        await api.post('/user-notif', {
          sender: sender,
          pesan: pesan,
          opd_penerima: opdPenerima,
          type: type,
        })
        const data = await api.get(`/user-notif?kodeopd=${opdPenerima}`)
        io.to(res.socketId).emit('getNotif', data.data.data)    //======================= send event notif to socket client ============
      } else {
        await api.post('/user-notif', {
          sender: sender,
          pesan: pesan,
          opd_penerima: opdPenerima,
          type: type
        })
      }
    })

  });

  socket.on('disconnect', () => {     //====================== user on disconnect ===================
    removeUser(socket.id)
    console.log('users on disconnect');
  })

});



sslServer.listen(3001, () => console.log('secure server run on port 3001'))
sslServer.timeout = 10000, console.log('server timeout 10 Sec.');

module.exports = app;