const express = require("express")
const router = express.Router()
const user = require("../controllers/authentication")
const verify = require("../middlewares/auth")
const data = require("../controllers/restaurants")
const cart = require("../controllers/cartUpdate")
const orderHandler = require("../controllers/order");
const getCartController = require("../controllers/getCart");

router.post("/signup", user.signup)
router.post("/login", user.login)
router.post("/verify", verify, (req, res) => {
  res.json({ message: "Verified route hit successfully!" });
});

router.get("/restaurant", data.restaurant)
router.get("/restaurant/:id", data.oneRestaurant);
router.post("/cartUpdate", verify, cart.updateCart);
router.post("/order", orderHandler.order);
router.get("/getCart",verify, getCartController.getCart);
router.get("/getOrders", orderHandler.getOrders);
router.put("/updateStatus/:_id", orderHandler.orderStatus);
router.get("/getOrder/:id", orderHandler.getOrder);

module.exports = router