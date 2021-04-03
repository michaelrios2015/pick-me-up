const router = require('express').Router();
const { models: { Message, UserGame, User, Game }} = require('../../db');
module.exports = router;

// gets all messages
router.get('/', async (req, res, next) => {
  try {
    res.send(await Message.findAll());
  } 
  catch (ex) {
    next(ex)
  }
});

// gets all messages with same gameId
router.get('/:gameId', async (req, res, next) => {
  try {
    res.send(await Message.findAll({
      where: {
        gameId: req.params.gameId
      }
    }));
  } 
  catch (ex) {
    next(ex)
  }
});

// Don't think this is needed
router.put('/:id', async (req, res, next) => {
  try {
    const message = await Message.findByPk(req.params.id);
    await message.update(req.body);
    res.send(chat);
  }
  catch(ex) {
    next(ex);
  }
});


router.post('/', async (req, res, next) => {
  try {
    const message = await Message.create(req.body);
    res.status(201).send(message);
  }
  catch(ex) {
    next(ex);
  }
});

// app.post('/webSocket', (req, res)=> {
//   try {
//     const message = await Message.create(req.body);
//     res.status(201).send(message);
//   }
//   catch(ex) {
//     next(ex);
//   }
// })