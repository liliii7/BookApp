const Sequelize = require("sequelize");
const connection = require("../context/appContext");

const Categories = connection.define('category', {
    categoryId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,   
        primaryKey: true,
    },
    categoryName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
})

module.exports = Categories;