const Users = require("./usersmodel");
const Messages = require("./messagetable");

Users.hasMany(Messages);
Messages.belongsTo(Users);

module.exports={
    Users,Messages
}