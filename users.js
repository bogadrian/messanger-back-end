const Chat = require('./chatModel');
const Text = require('./textModel');

const users = [];

const addMsg = ({ name, reciver, room, reciverEmail, myEmail, id }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  if (!name || !room) return { error: 'Username and room are required.' };

  const user = { name, room, id, reciver, reciverEmail, myEmail };

  users.push(user);

  const addToDb = async ({ name, reciver, reciverEmail, myEmail, room }) => {
    const existingRoom = await Chat.findOne({ room: room }, function (
      err,
      room
    ) {
      console.log(err);
    });

    if (!existingRoom) {
      const newRoom = Chat({
        sender: name,
        reciver,
        reciverEmail,
        myEmail,
        room
      });
      newRoom.save(function (err) {
        console.log(err);
      });
    }
  };
  addToDb({ name, reciver, reciverEmail, myEmail, room });
  return { user };
};

const getUser = id => users.find(user => user.id === id);

const addMessage = async (room, name, reciver, myEmail, reciverEmail, text) => {
  if (text && room && name) {
    const newMsg = Text({ text, name, reciver, room, myEmail, reciverEmail });

    newMsg.save(function (err, text) {
      console.log(err);
    });
  }
};

module.exports = { addMsg, getUser, addMessage };
