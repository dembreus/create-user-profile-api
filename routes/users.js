const express = require("express");
const router = express.Router();
const Joi = require("joi");

const users = [
  {
    id: 0,
    firstName: "Bob",
    lastName: "Dob",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    hasAgreed: false
  },
  {
    id: 1,
    firstName: "Bill",
    lastName: "Murray",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    hasAgreed: false
  },
  {
    id: 2,
    firstName: "Ryan",
    lastName: "Reynolds",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    hasAgreed: false
  },
  {
    id: 3,
    firstName: "Lexi",
    lastName: "Beckstead",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    hasAgreed: false
  }
];

router.get("/", (req, res) => {
  res.send(users);
});

router.get("/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user)
    return res.status(404).send("The user is the given ID was not found");
  res.send(user);
});

router.post("/", (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = {
    id: users.length,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    hasAgreed: req.body.hasAgreed
  };

  users.push(user);
  res.send(user);
});

router.put("/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));

  if (!user)
    return res.status(404).send("The user is the given ID was not found");

  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.phoneNumber = req.body.phoneNumber;
  user.email = req.body.email;
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.hasAgreed = req.body.hasAgreed;

  res.send(user);
});

router.delete("/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  const index = users.indexOf(user);
  users.splice(index, 1);
  res.send(user);
});

const validateUser = user => {
  const schema = {
    firstName: Joi.string()
      .min(2)
      .max(16)
      .required(),
    lastName: Joi.string()
      .min(2)
      .max(24)
      .required(),
    phoneNumber: Joi.string()
      .min(2)
      .max(24)
      .required(),
    email: Joi.string()
      .min(2)
      .max(24)
      .required(),
    password: Joi.string()
      .min(2)
      .max(24)
      .required(),
    confirmPassword: Joi.string()
      .min(2)
      .max(24)
      .required(),
    hasAgreed: Joi.boolean().required()
  };

  return Joi.validate(user, schema);
};

module.exports = router;
