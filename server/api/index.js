//as this get's bigger you can seperate things out more
const express = require('express');
const { static } = express;
const path = require('path');
const axios = require('axios');
const { db, models: { User, Request, Game, User_Game } } = require('../db');

const app = express();
module.exports = app

app.use(express.json());

app.use('/dist', static(path.join(__dirname, '..', '..', 'dist')));

// is this supposed to be here??
app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, '..', '..', 'public/index.html')));

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', '..', 'public')))

//gets all users
app.get('/api/users', async(req, res, next)=> {
  try {
    res.send(await User.findAll());
  }
  catch(ex){
    next(ex);
  }
});

//gets a user
app.get('/api/users/:id', async(req, res, next)=> {
  try {
    res.send(await User.findByPk(req.params.id));
  }
  catch(ex){
    next(ex);
  }
});

// creates a user
app.post('/api/users', async(req, res, next)=> {
  try {
    res.status(201).send(await User.create(req.body));
  }
  catch(ex){
    next(ex);
  }
});

//deletes a user 
app.delete('/api/users/:id', async(req, res, next)=> {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.sendStatus(204);
  }  
  catch(ex){
    next(ex);
  }
});

//gets all request
app.get('/api/requests', async(req, res, next)=> {
  try {
    res.send(await Request.findAll({ include: [ User, Game ]}));
  }
  catch(ex){
    next(ex);
  }
});

//gets a request not sure if we will need this but it's easy to write
app.get('/api/requests/:id', async(req, res, next)=> {
  try {
    res.send(await Request.findByPk(req.params.id, { include: [ User, Game ]}));
  }
  catch(ex){
    next(ex);
  }
});

// creates a request
app.post('/api/requests', async(req, res, next)=> {
  try {
    res.status(201).send(await Request.create(req.body));
  }
  catch(ex){
    next(ex);
  }
});

//deletes a user 
app.delete('/api/requests/:id', async(req, res, next)=> {
  try {
    const request = await Request.findByPk(req.params.id);
    await request.destroy();
    res.sendStatus(204);
  }  
  catch(ex){
    next(ex);
  }
});


//gets all games
app.get('/api/games', async(req, res, next)=> {
  try {
    res.send(await Game.findAll());
  }
  catch(ex){
    next(ex);
  }
});

//gets a games
app.get('/api/games/:id', async(req, res, next)=> {
  try {
    res.send(await Game.findByPk(req.params.id));
  }
  catch(ex){
    next(ex);
  }
});

// creates a game
app.post('/api/games', async(req, res, next)=> {
  try {
    res.status(201).send(await Game.create(req.body));
  }
  catch(ex){
    next(ex);
  }
});

//deletes a game 
app.delete('/api/games/:id', async(req, res, next)=> {
  try {
    const game = await Game.findByPk(req.params.id);
    await game.destroy();
    res.sendStatus(204);
  }  
  catch(ex){
    next(ex);
  }
});

// again not using at the moment but will leave in
//gets all user_games
app.get('/api/user_games', async(req, res, next)=> {
  try {
    res.send(await User_Game.findAll({ include: [User, Game]}));
  }
  catch(ex){
    next(ex);
  }
});


//final error catcher 
app.use((err, req, res, next)=>{
  res.status(500).send({ error:err });
});



