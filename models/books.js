const Sequelize = require("sequelize");
const connection = require("../context/appContext");

const Books = connection.define("book",{
    bookId:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,   
        primaryKey: true,
    },
    bookName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    year:{
        type: Sequelize.STRING,
        allowNull: false
    },
    imagePath: {
    type: Sequelize.STRING,
    allowNull: false,
    },
})

module.exports = Books;