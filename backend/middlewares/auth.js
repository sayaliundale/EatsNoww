const jwt = require("jsonwebtoken")

const isAuthenticated = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect("/login");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.log("Token verification failed", err.message);
        return res.redirect("/login");
    }
}


module.exports = isAuthenticated