const express = require("express");
const app = express();

const TransactionService = require("../Services/transactions");
const { getUserById } = require("../../User/Services/users");

app.use(express.json());
const cors = require("cors");
app.use(cors());

// get tansaction by user id.
const getTransactionByUserId = async (req, res) => {
  try {
    const id = req.params.userId;
    const transactions = await TransactionService.getAllUserTransactions(id);
    res.status(200).send(transactions);
  } catch (error) {
    res.status(400).send(error);
  }
};

// get tansaction by order id.
const getTransactionByOrderId = async (req, res) => {
  try {
    const { userId, orderId } = req.params;
    const transaction = await TransactionService.getAllOrderTransactions(
      userId,
      orderId
    );
    res.status(200).send(transaction);
  } catch (error) {
    res.status(400).send({ error: "Bad response" });
  }
};

// handle create transaction.
const transactionCreate = async (req, res) => {
  try {
    const { u_id, o_id, item, mode, amount } = req.body; // Remove `created_at` from destructuring

    // Check if user exists
    const existingUser = await getUserById(u_id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Call the service without passing `created_at`
    const postTransaction = await TransactionService.createTransactions(
      u_id,
      o_id,
      item,
      mode,
      amount
    );
    return res.status(200).send(postTransaction);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

// handle update transaction
const transactionUpdate = async (req, res) => {
  try {
    console.log(req.body);
    const { t_id, item, mode, amount } = req.body;
    const putTransaction = await TransactionService.updateTransactions(
      t_id,
      item,
      mode,
      amount
    );
    return res.status(200).send(putTransaction);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

// handle delete tranasaction
const transactionDelete = async (req, res) => {
  try {
    const id = req.params.t_id;
    const transaction = await TransactionService.getTransactionById(id);
    if (transaction != null && transaction.length > 0) {
      await TransactionService.deleteTransactions(id);
      return res
        .status(200)
        .send({ message: "Transaction deleted successfully " });
    } else {
      return res.status(404).send({ message: "Transaction Not Found", id });
    }
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = {
  getTransactionByUserId,
  getTransactionByOrderId,
  transactionCreate,
  transactionUpdate,
  transactionDelete,
};
