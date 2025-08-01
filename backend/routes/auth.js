const express = require("express")
const router = express.Router()
const user = require("../controllers/authentication")
const verify = require("../middlewares/auth")
const data = require("../controllers/restaurants")

router.post("/signup", user.signup)
router.post("/login", user.login)
router.post("/verify", verify, (req, res) => {
  res.json({ message: "Verified route hit successfully!" });
});

router.get("/restaurant", data, (req, res) => {
  res.json({ message: "Data Fecthed successfully!" });
})

module.exports = router