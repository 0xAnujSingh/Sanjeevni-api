const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");

//declare routes
router.get("/users", userController.getUsers);
router.get("/user/:id", userController.getById);
router.post("/user", userController.create);
router.put("/user/:id", userController.update);
router.delete("/user/:id", userController.userDelete);

module.exports = router;
