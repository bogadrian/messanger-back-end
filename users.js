const Text = require('./textModel');

const users = [];

const addMsg = ({ name, room, id, reciver, myEmail, reciverEmail }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  if (!name || !room) return { error: 'Username and room are required.' };

  const user = { name, room, id, reciver, myEmail, reciverEmail };

  users.push(user);
  //addMessage(name, room, reciver, myEmail, reciverEmail, '');
  return { user };
};

const getUser = id => users.find(user => user.id === id);

const addMessage = async (name, room, reciver, myEmail, reciverEmail, text) => {
  if (text && room && name) {
    const newMsg = Text({
      name,
      room,
      reciver,
      myEmail,
      reciverEmail,
      text
    });

    console.log('ssss');
    newMsg.save(function (err, text) {
      console.log(err);
    });
  }
};

module.exports = { addMsg, getUser, addMessage };
