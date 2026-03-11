const { DataTypes } = require("sequelize");
const sequelize = require("../dbconnection");

const Messages = sequelize.define("ArchivedChat", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    message: {
        type: DataTypes.STRING,
        allowNull: true
    }, 
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    roomName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    time: {
        type: DataTypes.STRING,
        allowNull: true
    }
    }, 
    {
    tableName: "ArchivedChat",
    timestamps: false
}
);

module.exports = Messages;