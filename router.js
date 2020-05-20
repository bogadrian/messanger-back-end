const express = require('express');
const router = express.Router();

const Text = require('./textModel');

router.get('/', (req, res) => {
  res.send({ response: 'Server is up and running.' }).status(200);
});

router.get('/messages/:email', async (req, res) => {
  if (!req.params.email) {
    throw new Error('No room passed in params');
  }

  let query = await Text.find({ reciverEmail: req.params.email }, function (
    err,
    text
  ) {
    console.log(err);
  }).limit(100);

  const messages = await query;

  if (!messages) {
    throw new Error('Not messages yet');
  }

  res.status(200).json({
    status: 'success',
    data: messages
  });
});

router.get('/:room', async (req, res) => {
  if (!req.params.room) {
    return;
  }
  const room = await Text.find({ room: req.params.room }, function (err, room) {
    console.log(err);
  });

  if (!room) {
    throw new Error('There is no such a room');
  }

  res.status(200).json({
    status: 'success',
    data: room
  });
});

router.patch('/toggle/:id/:read', async (req, res) => {
  if (!req.params.id) {
    throw new Error('No data provided');
  }
  const updatedRead = await Text.findByIdAndUpdate(
    req.params.id,
    {
      $set: { read: req.params.read }
    },
    function (err, read) {
      console.log(err);
    }
  );

  res.status(200).json({
    status: 'success',
    data: updatedRead
  });
});

module.exports = router;
