const express = require("express")
const router = express.Router()
const user = require("../controllers/authentication")
const verify = require("../middlewares/auth")
const data = require("../controllers/restaurants")
const cart = require("../controllers/cartUpdate")
const profile = require("../controllers/authentication")
const getCartController = require("../controllers/getCart");

router.post("/signup", user.signup)
router.post("/login", user.login)
router.post("/verify", verify, (req, res) => {
  res.json({ message: "Verified route hit successfully!" });
});

router.get("/restaurant", data.restaurant)
router.get("/restaurant/:id", data.oneRestaurant);
router.post("/cartUpdate", verify, cart.updateCart);
router.get("/me", profile.getMyProfile)
router.get("/getCart",verify, getCartController.getCart)

module.exports = router