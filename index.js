const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
var bodyParser = require('body-parser');
bodyParser.json();
const { addMsg, getUser, addMessage } = require('./users');

const router = require('./router');

const app = express();

const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

let DB = process.env.DATABASE.replace('<DATABASE_NAME>', process.env.DATABASE);
DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDb is connected at this point!'));

io.on('connect', socket => {
  socket.on(
    'join',
    ({ name, reciver, reciverEmail, myEmail, room }, callback) => {
      const id = socket.id;
      const { user, error } = addMsg({
        id,
        name,
        reciver,
        myEmail,
        reciverEmail,
        room
      });
      if (error) throw new Error(error);
      socket.join(user.room);

      callback();
    }
  );

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    addMessage(
      user.room,
      user.name,
      user.reciver,
      user.myEmail,
      user.reciverEmail,
      message
    );
    callback();
  });
});

const PORT = process.env.PORT || 5002;

server.listen(PORT, () => console.log(`Server has started. on ${PORT}`));
