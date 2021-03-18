const a = require('./test');

const db  = require('./index');

// const Sequelize = require('sequelize')
// const { STRING, FLOAT, INTEGER, ENUM, BOOLEAN, DATE } = Sequelize;



const test = () => {

    console.log('---------------------------------------')
    console.log(a)
    console.log(db)

};

test();

// console.log(db);

const Game2 = 1;

// const Game = db.define('game', {
//   //Once matching does not need to be exact time/date, and location will need 
//   //to be put back 
//   winner: { 
//     type: STRING, 
//   },  
//   finalScore: { 
//     type: STRING, 
//   },
//   // this should not be necessary, but seems like a nice safety measure for the moment
//   done:{
//     type:BOOLEAN,
//     defaultValue: false
//   },
//   open: {
//     type: BOOLEAN,
//     defaultValue: true
//   },
//   // this will need to be changed starting off really restirctive to  make testing
//   // easier will need to replaced with LAT, LONG I assume
//   location: {  
// 		type: STRING
//     // type: ENUM('COURT 1', 'COURT 2', 'COURT 3','COURT 4','COURT 5'), 
//   },
//   // I think date and time can go together, keeping it very simple at the moment
//   // just time date will be added back again very restrive for testing 
//   time: { 
//       type: STRING
//   },

// 	date: {
// 		type: DATE
// 	},

// 	host: {
// 		type: STRING
// 	}
	
// },{ timestamps: false });  

module.exports = Game2;