const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(
    __dirname,
    "../database.sqlite")
});

const Payment = sequelize.define('Payment', {
    orderId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    paymentSessionId : {
        type: DataTypes.STRING,
        allowNull: false
    },
    orderAmount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    orderCurrency: {
        type: DataTypes.STRING,
        allowNull: false
    },
    paymentStatus: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Other model options go here
});

module.exports = Payment;

(async () => {
    await sequelize.sync({ force: true }); // Sync all models
})();
