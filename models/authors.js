const Sequelize = require("sequelize");
const connection = require("../context/appContext");

const Authors = connection.define('author', {
    authorId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,   
        primaryKey: true,
    },
    authorName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
})

module.exports = Authors;