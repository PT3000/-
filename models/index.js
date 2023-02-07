const Sequelize = require('sequelize');
const User = require('./user');
const Comment = require('./comment');
const Main = require('./main');
const Board = require('./board');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.User = User;
User.init(sequelize);

db.Comment = Comment;
Comment.init(sequelize);

db.Main = Main;
Main.init(sequelize);

db.Board = Board;
Board.init(sequelize);

User.associate(db);
Comment.associate(db);
Main.associate(db);
Board.init(sequelize);


module.exports = db;