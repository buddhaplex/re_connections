const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Profiles Model
const Profile = require("../../models/Profile");

// Load User Model
const User = require("../../models/User");

// *Route:  GET api/posts/test
// *Desc:   Tests post route
// *Access: Public
router.get("/test", (req, res) => res.json({ msg: "Posts is working." }));

module.exports = router;
