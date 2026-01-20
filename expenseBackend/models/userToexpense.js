const Expense = require("./expense");
const User = require("./UsersTable");

User.hasMany(Expense,{ foreignKey: "userId" });
Expense.belongsTo(User,{ foreignKey: "userId" });

module.exports={
    Expense,User
}