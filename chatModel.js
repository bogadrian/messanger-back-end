const mongoose = require('mongoose');
const Text = require('./textModel');

const chatSchema = mongoose.Schema({
  room: {
    type: String,
    required: [true, 'A room is required'],
    unique: true
  },
  reciver: { type: String, required: [true, 'Please provide a reciver'] },
  sender: {
    type: String,
    required: [true, 'A sender is required']
  },
  reciverEmail: {
    type: String,
    required: [true, 'A reciver email is required']
  },
  myEmail: {
    type: String,
    required: [true, 'A sender email is required']
  },
  createdAt: { type: Date, default: Date.now }
});

const Chat = mongoose.model('Message', chatSchema);

module.exports = Chat;
