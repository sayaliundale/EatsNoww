const cookie = require("cookie");
const jwt = require("jsonwebtoken");

const socketAuth = async (socket, next) => {
    try {
        const cookies = socket.handshake.headers.cookie;

        if (!cookies) {
            return next(new Error("No cookies found"));
        }

        const parsedCookies = cookie.parse(cookies);
        const token = parsedCookies.token;  

        if (!token) {
            return next(new Error("Authentication token missing"));
        }

        const user = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = user; 

        next();
    } catch (err) {
        console.error("Socket authentication error:", err.message);
        next(new Error("Authentication error"));
    }

}

module.exports = { socketAuth }