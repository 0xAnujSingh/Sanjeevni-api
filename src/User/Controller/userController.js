const express = require("express");
const app = express();

const userService = require("../Services/users");

app.use(express.json());
const cors = require("cors");
const { error } = require("console");
app.use(cors());

// handle get all users
const getUsers = async (req, res) => {
  try {
    const user = await userService.getAllUsers();
    console.log(user);
    if (user != null && user.length > 0) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: "No user Found" });
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

// Handler to get an user by ID
const getById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userService.getUserById(id);
    console.log(user);
    if (!user) {
      return res.status(404).send({ message: "No user found with id: ", id });
    }
    return res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error });
  }
};

// handle create user
const create = async (req, res) => {
  try {
    const { name, password, phone_number, address, type, email } = req.body;

    const verifyEmail = await userService.getUserByEmail(email);

    if (!verifyEmail || verifyEmail.length === 0) {
      // Create user
      const user = await userService.createUser(
        name,
        password,
        phone_number,
        address,
        type,
        email
      );
      return res.status(200).send({
        message: "User Created Successfully",
        user,
      });
    }

    // User with this email already exists
    return res.status(400).send({
      message: "User with this email already exists",
      email,
    });
  } catch (error) {
    res.status(400).send({
      message: "Bad Request",
      error,
    });
  }
};

// handle update user
const update = async (req, res) => {
  try {
    const { id, name, password, phone_number, address, type } = req.body;
    console.log(req.body);
    // Fetch the user by ID
    const getUser = await userService.getUserById(id);
    console.log(getUser);

    if (getUser) {
      // Update the user
      const user = await userService.updateUser(
        id,
        name,
        password,
        phone_number,
        address,
        type
      );
      return res.status(200).send({
        message: "User Updated Successfully",
        user,
      });
    }

    // User does not exist
    return res.status(400).send({
      message: "User does not exist",
      id,
    });
  } catch (error) {
    res.status(400).send({
      message: "Bad Request",
      error,
    });
  }
};

// handle delete user
const userDelete = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("ID received:", id);

    const getUser = await userService.getUserById(id);
    console.log("User fetched:", getUser);

    if (getUser) {
      await userService.deleteUser(id); // Assuming this method deletes the user
      return res.status(200).send({
        message: "User deleted successfully",
        deletedUser: getUser, // Optionally include the deleted user's details
      });
    }

    return res.status(404).send({ message: "User does not exist", id });
  } catch (error) {
    console.error("Error in userDelete:", error);
    res.status(500).send({ message: "Internal Server Error", error });
  }
};

module.exports = {
  getUsers,
  getById,
  create,
  update,
  userDelete,
};
