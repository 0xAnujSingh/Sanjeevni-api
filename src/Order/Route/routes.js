const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/orderController");

// declare the routes
router.get("/order/:id", orderController.getOrderById);
router.get("/order/getByuserId/:userId", orderController.getOrderByUserId);
router.post("/order", orderController.createOrder);
router.delete("/order/:id", orderController.deleteById);
router.put("/order/:id", orderController.orderUpdate);

module.exports = router;
