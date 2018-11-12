const express = require("express");
const router = express.Router();

const users = [
  { id: 0, firstName: "Bob", lastName: "Dob" },
  { id: 1, firstName: "Bill", lastName: "Murray" },
  { id: 2, firstName: "Ryan", lastName: "Reynolds" },
  { id: 3, firstName: "Lexi", lastName: "Beckstead" }
];

router.get("/", (req, res) => {
  res.send(users);
});

router.get("/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  res.send(user);
});

router.post("/", (req, res) => {
  const user = {
    id: users.length,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  };

  users.push(user);
  res.send(user);
});

router.put("/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  res.send(user);
});

router.delete("/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  const index = users.indexOf(user);
  users.splice(index, 1);
  res.send(user);
});

module.exports = router;
