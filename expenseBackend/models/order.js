// const { DataTypes } = require("sequelize");
// const sequelize = require("../dbconnection");
// const Users = require("./UsersTable");

// const Order = sequelize.define("Orders", {
//   orderId: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   paymentSessionId: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   status: {
//     type: DataTypes.STRING,
//     defaultValue: "PENDING" // PENDING | SUCCESS | FAILED
//   }
// });

// // relation
// Users.hasMany(Order);
// Order.belongsTo(Users);

// module.exports = Order;
