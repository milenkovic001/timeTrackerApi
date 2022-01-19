const express = require("express");
const router = express.Router();
const { User } = require("./models/user");

router.get("/", async (req, res) => {
  let data = await User.findOne({ email: req.body.email });
  if (!data) return res.status(400).send("User does not exist");
  res.send(data);
});

router.post("/", async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    creationDate: new Date(),
  });

  const result = await user.save();
  res.send(result);
});

// treba da se registruje

module.exports = router;
