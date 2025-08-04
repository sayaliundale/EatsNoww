const jwt = require("jsonwebtoken")

const isAuthenticated = async (req, res, next) => {
    const token = req.cookies.token;
    console.log("🍪 Received Token:", token);  // ADD THIS

    if (!token) {
        console.log("❌ No token found");
        return res.redirect("/login");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Decoded Token:", decoded);  // ADD THIS

        req.user = decoded;
        next();
    } catch (err) {
        console.log("❌ Token verification failed", err.message);
        return res.redirect("/login");
    }
}


module.exports = isAuthenticated