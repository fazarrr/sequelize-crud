const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    'sequelize-crud',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.biodata = require("./biodata.model")(sequelize, Sequelize);

module.exports = db;