const { models: { User, Request, Game, UserGame } } = require('./db');
const app = require('./api')
const syncAndSeed = require('./synchAndSeed')

//one to many relationship
User.hasMany(Request);
Request.belongsTo(User);

Game.hasMany(Request);
Request.belongsTo(Game);

// sequelize makes us do this to use include 
User.belongsToMany(Game, { through: UserGame });
Game.belongsToMany(User, { through: UserGame });
User.hasMany(UserGame);
UserGame.belongsTo(User);
Game.hasMany(UserGame);
UserGame.belongsTo(Game);


const init = async () => {
	try {
		await syncAndSeed();
		const port = process.env.PORT || 3000;
		app.listen(port, () => console.log(`listening on port ${port}`));
	} catch (ex) {
		console.log(ex);
	}
};

init();
