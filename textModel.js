const mongoose = require('mongoose');

const textSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name is required']
  },
  room: {
    type: String,
    required: [true, 'A room is required']
  },
  reciver: { type: String, required: [true, 'Please provide a reciver'] },
  myEmail: {
    type: String,
    required: [true, 'A sender email is required']
  },
  reciverEmail: {
    type: String,
    required: [true, 'A reciver email is required']
  },
  text: {
    type: String,
    required: [true, 'A text is required']
  },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Text = mongoose.model('Text', textSchema);

module.exports = Text;
