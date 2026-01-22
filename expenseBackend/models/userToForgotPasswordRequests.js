
const ForgotPasswordRequests = require("./ForgotPasswordRequests");
const User = require("./UsersTable");

User.hasMany(ForgotPasswordRequests,{ foreignKey: "userId" });
ForgotPasswordRequests.belongsTo(User,{ foreignKey: "userId" });

module.exports={
    User,ForgotPasswordRequests
}