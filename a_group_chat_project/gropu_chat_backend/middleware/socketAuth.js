const User = require("../models/usersmodel")
const jwt = require("jsonwebtoken")
module.exports = (io) => {
    io.use(async(socket, next) => {
    try {
console.log("Authenticating socket connection...");
        const token = socket.handshake.auth.token;

console.log("Received token from socket handshake:", token);
        if (!token) {
            return next(new Error( "Authorization token is missing" ));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

console.log("Decoded token from socket handshake:", decoded);
        if (!decoded) {
            return next(new Error("Invalid or expired token" ));
        }

        const user = await User.findByPk(decoded.userId);

console.log("User found for socket connection:", user);
        if (!user) {
            return next(new Error("User not found" ));
        }

        socket.user = user; // Attach user object to request
        next();
    } catch (error) {
        console.error("Error in socket authentication middleware:", error);
        return next(new Error("Internal Server Error" ));
    }
});
};