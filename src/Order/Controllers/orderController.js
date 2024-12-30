const express = require("express");
const app = express();
const modelOrder = require("../Model/orderModel");
const {
  getOrder,
  getOrderByUser,
  createOrders,
  updateOrders,
  deleteOrder,
} = require("../Services/orders");

const { getById } = require("../../User/Controller/userController");
const { getUserById } = require("../../User/Services/users");

app.use(express.json());
const cors = require("cors");
const { error } = require("console");
app.use(cors());

// Handler to get an order by ID
const getOrderById = async (req, res) => {
  // id from user
  const id = req.params.id;
  try {
    // service call.
    const order = await getOrder(id);
    if (order != null && order.length > 0) {
      res.status(200).send(order);
    } else {
      res.status(404).send({ message: "Order Not Found", id });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

// get order by user id
const getOrderByUserId = async (req, res) => {
  // id from user input
  const userId = req.params.userId;
  try {
    // service call.
    const order = await getOrderByUser(userId);
    if (order != null && order.length > 0) {
      res.status(200).send(order);
    } else {
      res.status(404).send({ message: "Order Not Found For User", userId });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// Handler to create an order
const createOrder = async (req, res) => {
  // user input.
  const { u_id, quantity, status, total_amount, created_at } = req.body;

  try {
    // check that user is already present ot not.
    const existingUser = await getUserById(u_id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const postOrder = await createOrders(
      u_id,
      quantity,
      status,
      total_amount,
      created_at
    );

    res.status(201).send(postOrder);
  } catch (error) {
    console.error(error); // Log errors for debugging
    res.status(500).send({ error: "Internal Server Error" });
  }
};

//  Handler to update an order
const orderUpdate = async (req, res) => {
  // user input.
  const { quantity, status, total_amount } = req.body;
  const o_id = req.params.id;
  try {
    // const _isUserExisting = await getUserById(u_id);
    // console.log(_isUserExisting);
    // if (!_isUserExisting) {
    //   return res
    //     .status(404)
    //     .json({ message: "User not found with user id", u_id });
    // }
    // 1st check that order is already present or not that we have to update.
    const order = await getOrder(o_id);
    if (order != null && order.length > 0) {
      await updateOrders(o_id, quantity, status, total_amount);
      res.status(201).send({ message: "Order Updated Successfully", o_id });
    } else {
      res.status(404).send({ message: "Order Not Found", o_id });
    }
  } catch (error) {
    return res.status(500).send({ error: "Internal server error", error });
  }
};

//  Handler to delete an order
const deleteById = async (req, res) => {
  // user input
  const id = req.params.id;
  try {
    // 1st check order is present or not.
    const order = await getOrder(id);
    console.log(order);
    if (order != null && order.length > 0) {
      await deleteOrder(id);
      res.status(200).send({ message: "Order deleted successfully", id });
    } else {
      return res.status(404).send({ error: "Order not found", id });
    }
  } catch (error) {
    res.status(500).send({ error: "Bad Response" });
  }
};

// Export the handlers
module.exports = {
  getOrderById,
  getOrderByUserId,
  createOrder,
  orderUpdate,
  deleteById,
};
