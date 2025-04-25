import express from "express";
const router = express.Router();

import userClient from "../connections/user.connection.js";

router.post("/get", (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  userClient.GetUserById({ userId: id }, (err, response) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json(response);
  });
});

router.post("/create", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name and email and password are required" });
  }
  userClient.CreateUser({ name, email, password }, (err, response) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(201).json(response);
  });
});

export default router;
