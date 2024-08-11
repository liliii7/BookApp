const Sequelize = require("sequelize");
const connection = require("../context/appContext");

const Editorials = connection.define("editorial", {
    editorialId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    editorialName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING
    },
    country: {
        type: Sequelize.STRING
    },
});

module.exports = Editorials;