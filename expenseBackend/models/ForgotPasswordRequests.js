const { DataTypes } = require("sequelize");
const sequelize = require("../dbconnection"); // your sequelize instance

const ForgotPasswordRequests = sequelize.define('ForgotPasswordRequests', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4, // Automatic random UUID
        allowNull: false
    },
    isactive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true, // reset link active by default
        allowNull: false
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false // will set expiry when creating a new reset request
    },
    userId: {
        type: DataTypes.INTEGER, // Assuming Users table id is INTEGER
        allowNull: false
    }
}, {
    timestamps: true,   // createdAt and updatedAt automatically
    tableName: 'ForgotPasswordRequests'
});

console.log("ForgotPasswordRequests table ready / synced");

console.log("ForgotPasswordRequests table ready / synced");

module.exports = ForgotPasswordRequests;