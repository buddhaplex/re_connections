const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// load user model
const User = require("../../models/User");

// *Route:  GET api/users/test
// *Desc:   Tests users route
// *Access: Public
router.get("/test", (req, res) => res.json({ msg: "Users is working." }));

// *Route:  POST api/users/register
// *Desc:   Register a user
// *Access: Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // checking validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // size
        r: "pg", // rating
        d: "mm" // default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// *Route:  GET api/users/login
// *Desc:   Login User / Return JWT token
// *Access: Public

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // checking validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // find user by email
  User.findOne({ email }).then(user => {
    // check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    // check pw
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // user matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; // creating jwt payload
        // sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// *Route:  GET api/users/current
// *Desc:   Return current user
// *Access: Private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.id,
      email: req.user.email
    });
  }
);

module.exports = router;
