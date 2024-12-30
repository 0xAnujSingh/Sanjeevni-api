const express = require("express");
const router = express.Router();

const transactionController = require("../Controller/transactionController");

// declare routes
router.get(
  "/userTransaction/:userId",
  transactionController.getTransactionByUserId
);
router.get(
  "/userTransaction/:userId/:orderId",
  transactionController.getTransactionByOrderId
);
router.post("/transaction", transactionController.transactionCreate);
router.put("/transaction/:t_id", transactionController.transactionUpdate);
router.delete("/transaction/:t_id", transactionController.transactionDelete);

module.exports = router;
