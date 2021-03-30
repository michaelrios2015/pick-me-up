const { db, models: { User, Request, Game, UserGame } } = require('./db');
const app = require('./api');
const syncAndSeed = require('./db/syncAndSeed');
const ws = require('ws');

const init = async () => {
	try {
    if (process.env.SEED){
		  await syncAndSeed();
    }
    //no clue what this is doing but was in the Grace Shopper boiler plate should ask
    else {
      await db.sync()
    }
		const port = process.env.PORT || 3000;
		const server = app.listen(port, () => console.log(`listening on port ${port}`));
		const webSocketServer = new ws.Server({ server });

		let sockets = [];

		webSocketServer.on('connection', (socket)=> {
			sockets.push(socket);
			socket.on('message', (data)=> {
				sockets.filter(s => s !== socket).forEach(s => s.send(data));
			})
			socket.on('close', ()=> {
				sockets = sockets.filter(s => s !== socket);
			})
		})
	} catch (ex) {
		console.log(ex);
	}
};

init();
