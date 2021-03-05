const { db, models: { User, Request, Game } } = require('./db');
const app = require('./api')

// should be able to add relationships here


  const syncAndSeed = async()=> {
    await db.sync({ force: true });
    for (let i = 1; i< 10; i++){
      let email = "test"+i+"@email.com";
      await User.create({ email, password: '123'});
    }


  };

  


const init = async()=> {
    try {
      await syncAndSeed();
      const port = process.env.PORT || 3000;
      app.listen(port, ()=> console.log(`listening on port ${port}`));
    }
    catch(ex){
      console.log(ex);
    }
  };


init();